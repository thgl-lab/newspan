import { NextResponse } from "next/server";
import { cleanText, extractDomain } from "../../../lib/textUtils";

const NAVER_ENDPOINT = "https://naverapihub.apigw.ntruss.com/search/v1/news";
const VALID_SORTS = new Set(["sim", "date"]);
const MAX_DISPLAY = 20;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("query") || "").trim();
  const sortParam = searchParams.get("sort") || "sim";
  const sort = VALID_SORTS.has(sortParam) ? sortParam : "sim";
  const displayParam = Number.parseInt(searchParams.get("display"), 10);
  const display =
    Number.isFinite(displayParam) && displayParam > 0
      ? Math.min(displayParam, MAX_DISPLAY)
      : MAX_DISPLAY;

  if (!query) {
    return NextResponse.json(
      { error: { message: "검색어를 입력해주세요." } },
      { status: 400 }
    );
  }

  const apiKeyId = process.env.NCP_APIGW_API_KEY_ID;
  const apiKey = process.env.NCP_APIGW_API_KEY;

  if (!apiKeyId || !apiKey) {
    return NextResponse.json(
      {
        error: {
          message:
            "서버에 네이버 API 키가 설정되지 않았어요. .env.local을 확인해주세요.",
        },
      },
      { status: 500 }
    );
  }

  const upstreamUrl = new URL(NAVER_ENDPOINT);
  upstreamUrl.searchParams.set("query", query);
  upstreamUrl.searchParams.set("display", String(display));
  upstreamUrl.searchParams.set("start", "1");
  upstreamUrl.searchParams.set("sort", sort);

  let upstreamRes;
  try {
    upstreamRes = await fetch(upstreamUrl, {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": apiKeyId,
        "X-NCP-APIGW-API-KEY": apiKey,
      },
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "네트워크 문제로 요청을 완료하지 못했어요. 다시 시도해주세요.",
        },
      },
      { status: 502 }
    );
  }

  if (!upstreamRes.ok) {
    const upstreamBody = await upstreamRes.json().catch(() => null);
    return NextResponse.json(
      {
        error: {
          message: mapUpstreamError(upstreamRes.status, upstreamBody),
        },
      },
      { status: upstreamRes.status }
    );
  }

  const data = await upstreamRes.json();

  const items = (data.items || []).map((item) => {
    const originalLink = item.originallink || item.link;
    return {
      title: cleanText(item.title),
      description: cleanText(item.description),
      link: item.link,
      originalLink,
      source: extractDomain(originalLink),
      pubDate: item.pubDate,
    };
  });

  return NextResponse.json({
    total: data.total ?? items.length,
    query,
    sort,
    items,
  });
}

function mapUpstreamError(status, body) {
  switch (status) {
    case 401:
      return "네이버 API 인증에 실패했어요. 키가 올바른지 확인해주세요.";
    case 429:
      return "요청이 너무 많아요. 잠시 후 다시 시도해주세요.";
    default: {
      const detail = body?.error?.details || body?.error?.message;
      return detail
        ? `뉴스를 불러오는 중 문제가 발생했어요. (${detail})`
        : "뉴스를 불러오는 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.";
    }
  }
}
