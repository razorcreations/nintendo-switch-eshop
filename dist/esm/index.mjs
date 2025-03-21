import { fetch, FetchResultTypes } from '@sapphire/fetch';
import { Result } from '@sapphire/result';
import { XMLParser } from 'fast-xml-parser';
import { countries, regions } from 'country-data';

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/lib/utils/constants.ts
var US_ALGOLIA_ID = "U3B6GR4UA3";
var US_ALGOLIA_KEY = "c4da8be7fd29f0f5bfa42920b0a99dc7";
var QUERIED_US_ALGOLIA_KEY_NEW = "a29c6927638bfd8cee23993e51e721c9";
var QUERIED_US_ALGOLIA_KEY_OLD = "6efbfb0f8f80defc44895018caf77504";
var US_GET_GAMES_URL = `https://${US_ALGOLIA_ID}-dsn.algolia.net/1/indexes/*/queries`;
var QUERIED_US_GET_GAMES_URL_NEW = `https://${US_ALGOLIA_ID}-dsn.algolia.net/1/indexes/store_all_products_en_us/query`;
var QUERIED_US_GET_GAMES_URL_OLD = `https://${US_ALGOLIA_ID}-dsn.algolia.net/1/indexes/ncom_game_en_us/query`;
var US_GAME_CHECK_CODE = "70010000000185";
var US_ALGOLIA_HEADERS = {
  "Content-Type": "application/json",
  "X-Algolia-API-Key": US_ALGOLIA_KEY,
  "X-Algolia-Application-Id": US_ALGOLIA_ID
};
var EU_GET_GAMES_OPTIONS = {
  fq: "type:GAME AND system_type:nintendoswitch* AND product_code_txt:*",
  q: "*",
  sort: "sorting_title asc",
  start: "0",
  wt: "json"
};
var EU_GET_GAMES_URL = "http://search.nintendo-europe.com/{locale}/select";
var EU_GAME_CHECK_CODE = "70010000000184";
var EU_GAME_CODE_REGEX = /HAC\w(\w{4})/;
var EU_DEFAULT_LOCALE = "en";
var EU_GAME_LIST_LIMIT = 1e3;
var JP_GET_GAMES_URL = "https://www.nintendo.co.jp/data/software/xml/switch.xml";
var JP_GAME_CHECK_CODE = "70010000000039";
var JP_GAME_CODE_REGEX = /HAC(\w{4})/;
var JP_NSUID_REGEX = /\d{14}/;
var BR_ALGOLIA_ID = "U3B6GR4UA3";
var BR_ALGOLIA_KEY = "c4da8be7fd29f0f5bfa42920b0a99dc7";
var QUERIED_BR_ALGOLIA_KEY = "c4da8be7fd29f0f5bfa42920b0a99dc7";
var BR_GET_GAMES_URL = `https://${BR_ALGOLIA_ID}-dsn.algolia.net/1/indexes/*/queries`;
var QUERIED_BR_GET_GAMES_URL = `https://${BR_ALGOLIA_ID}-dsn.algolia.net/1/indexes/ncom_game_pt_br/query`;
var BR_ALGOLIA_HEADERS = {
  "Content-Type": "application/json",
  "X-Algolia-API-Key": BR_ALGOLIA_KEY,
  "X-Algolia-Application-Id": BR_ALGOLIA_ID
};
var PRICE_GET_URL = "https://api.ec.nintendo.com/v1/price";
var PRICE_GET_OPTIONS = { lang: "en" };
var PRICE_LIST_LIMIT = 50;
var Region = /* @__PURE__ */ ((Region2) => {
  Region2[Region2["AMERICAS"] = 1] = "AMERICAS";
  Region2[Region2["EUROPE"] = 2] = "EUROPE";
  Region2[Region2["ASIA"] = 3] = "ASIA";
  return Region2;
})(Region || {});

// src/lib/utils/utils.ts
var arrayRemoveDuplicates = /* @__PURE__ */ __name((array, property) => {
  const index = [];
  return array.filter((item) => {
    const key = property ? item[property] : item;
    return index.includes(key) ? false : index.push(key);
  });
}, "arrayRemoveDuplicates");
var _EshopError = class _EshopError extends Error {
  /**
   * Create an EshopError
   * @param message The message the error should show
   */
  constructor(message) {
    super(message);
    this.message = message;
    this.name = "EshopError";
  }
};
__name(_EshopError, "EshopError");
var EshopError = _EshopError;

// src/lib/utils/makeURLSearchParams.ts
function serializeSearchParam(value) {
  switch (typeof value) {
    case "string":
      return value;
    case "number":
    case "bigint":
    case "boolean":
      return value.toString();
    case "object":
      if (value === null) return null;
      if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? null : value.toISOString();
      }
      if (typeof value.toString === "function" && value.toString !== Object.prototype.toString) return value.toString();
      return null;
    default:
      return null;
  }
}
__name(serializeSearchParam, "serializeSearchParam");
function makeURLSearchParams(options) {
  const params = new URLSearchParams();
  if (!options) return params;
  for (const [key, value] of Object.entries(options)) {
    const serialized = serializeSearchParam(value);
    if (serialized !== null) params.append(key, serialized);
  }
  return params;
}
__name(makeURLSearchParams, "makeURLSearchParams");

// src/lib/getGames/getGamesAmerica.ts
async function getGamesAmerica() {
  const page = 0;
  const baseParameters = {
    hitsPerPage: US_GAME_LIST_LIMIT,
    page,
    analytics: false,
    facets: US_FACETS
  };
  const requests = [];
  for (const rating of US_ESRB_RATINGS_FILTERS) {
    requests.push(
      {
        indexName: US_INDEX_TITLE_ASC,
        params: makeURLSearchParams({ ...baseParameters, facetFilters: `[["${rating}"],["${US_PLATFORM_FACET_FILTER}"]]` }).toString()
      },
      {
        indexName: US_INDEX_TITLE_DESC,
        params: makeURLSearchParams({ ...baseParameters, facetFilters: `[["${rating}"],["${US_PLATFORM_FACET_FILTER}"]]` }).toString()
      }
    );
  }
  for (const rating of US_AVAILABILITY_FILTER) {
    requests.push(
      {
        indexName: US_INDEX_TITLE_ASC,
        params: makeURLSearchParams({ ...baseParameters, facetFilters: `[["${rating}"],["${US_PLATFORM_FACET_FILTER}"]]` }).toString()
      },
      {
        indexName: US_INDEX_TITLE_DESC,
        params: makeURLSearchParams({ ...baseParameters, facetFilters: `[["${rating}"],["${US_PLATFORM_FACET_FILTER}"]]` }).toString()
      }
    );
  }
  for (const rating of US_COMMON_GAME_FRANCHISES) {
    requests.push(
      {
        indexName: US_INDEX_TITLE_ASC,
        params: makeURLSearchParams({ ...baseParameters, facetFilters: `[["${rating}"],["${US_PLATFORM_FACET_FILTER}"]]` }).toString()
      },
      {
        indexName: US_INDEX_TITLE_DESC,
        params: makeURLSearchParams({ ...baseParameters, facetFilters: `[["${rating}"],["${US_PLATFORM_FACET_FILTER}"]]` }).toString()
      }
    );
  }
  const requestOptions = {
    body: JSON.stringify({
      requests
    }),
    method: "POST",
    headers: US_ALGOLIA_HEADERS
  };
  const gamesResponse = await Result.fromAsync(fetch(US_GET_GAMES_URL, requestOptions, FetchResultTypes.JSON));
  if (gamesResponse.isErr()) {
    throw new EshopError("Fetching of US Games failed");
  }
  let allGames = [];
  for (const results of gamesResponse.unwrap().results) {
    allGames = allGames.concat(results.hits);
  }
  allGames = arrayRemoveDuplicates(allGames, "slug");
  return allGames;
}
__name(getGamesAmerica, "getGamesAmerica");
var US_GAME_LIST_LIMIT = 1e3;
var US_INDEX_TITLE_ASC = "ncom_game_en_us_title_asc";
var US_INDEX_TITLE_DESC = "ncom_game_en_us_title_des";
var US_FACETS = JSON.stringify([
  "generalFilters",
  "platform",
  "availability",
  "genres",
  "howToShop",
  "virtualConsole",
  "franchises",
  "priceRange",
  "esrbRating",
  "playerFilters"
]);
var US_PLATFORM_FACET_FILTER = "platform:Nintendo Switch";
var US_ESRB_RATINGS_FILTERS = ["esrbRating:Everyone", "esrbRating:Everyone 10+", "esrbRating:Teen", "esrbRating:Mature"];
var US_AVAILABILITY_FILTER = ["availability:Pre-order", "availability:Coming soon", "availability:Available now"];
var US_COMMON_GAME_FRANCHISES = ["franchises:Mario", "franchises:Zelda", "franchises:Pok\xE9mon", "franchises:Kirby"];
async function getGamesBrazil() {
  const page = 0;
  const baseParameters = {
    hitsPerPage: BR_GAME_LIST_LIMIT,
    page,
    analytics: false,
    facets: BR_FACETS
  };
  const requests = [];
  for (const rating of BR_ESRB_RATINGS_FILTERS) {
    requests.push(
      {
        indexName: BR_INDEX_TITLE_ASC,
        params: makeURLSearchParams({ ...baseParameters, facetFilters: `[["${rating}"],["${BR_PLATFORM_FACET_FILTER}"]]` }).toString()
      },
      {
        indexName: BR_INDEX_TITLE_DESC,
        params: makeURLSearchParams({ ...baseParameters, facetFilters: `[["${rating}"],["${BR_PLATFORM_FACET_FILTER}"]]` }).toString()
      }
    );
  }
  for (const rating of BR_AVAILABILITY_FILTER) {
    requests.push(
      {
        indexName: BR_INDEX_TITLE_ASC,
        params: makeURLSearchParams({ ...baseParameters, facetFilters: `[["${rating}"],["${BR_PLATFORM_FACET_FILTER}"]]` }).toString()
      },
      {
        indexName: BR_INDEX_TITLE_DESC,
        params: makeURLSearchParams({ ...baseParameters, facetFilters: `[["${rating}"],["${BR_PLATFORM_FACET_FILTER}"]]` }).toString()
      }
    );
  }
  for (const rating of BR_COMMON_GAME_FRANCHISES) {
    requests.push(
      {
        indexName: BR_INDEX_TITLE_ASC,
        params: makeURLSearchParams({ ...baseParameters, facetFilters: `[["${rating}"],["${BR_PLATFORM_FACET_FILTER}"]]` }).toString()
      },
      {
        indexName: BR_INDEX_TITLE_DESC,
        params: makeURLSearchParams({ ...baseParameters, facetFilters: `[["${rating}"],["${BR_PLATFORM_FACET_FILTER}"]]` }).toString()
      }
    );
  }
  const requestOptions = {
    body: JSON.stringify({
      requests
    }),
    method: "POST",
    headers: BR_ALGOLIA_HEADERS
  };
  const gamesResponse = await Result.fromAsync(fetch(BR_GET_GAMES_URL, requestOptions, FetchResultTypes.JSON));
  if (gamesResponse.isErr()) {
    throw new EshopError("Fetching of BR Games failed");
  }
  let allGames = [];
  for (const results of gamesResponse.unwrap().results) {
    allGames = allGames.concat(results.hits);
  }
  allGames = arrayRemoveDuplicates(allGames, "slug");
  return allGames;
}
__name(getGamesBrazil, "getGamesBrazil");
var BR_GAME_LIST_LIMIT = 499;
var BR_INDEX_TITLE_ASC = "ncom_game_pt_br_title_asc";
var BR_INDEX_TITLE_DESC = "ncom_game_pt_br_title_des";
var BR_FACETS = JSON.stringify([
  "generalFilters",
  "platform",
  "availability",
  "genres",
  "howToShop",
  "virtualConsole",
  "franchises",
  "priceRange",
  "esrbRating",
  "playerFilters"
]);
var BR_PLATFORM_FACET_FILTER = "platform:Nintendo Switch";
var BR_ESRB_RATINGS_FILTERS = [
  "esrbRating:Livre",
  "esrbRating:10",
  "esrbRating:12",
  "esrbRating:14",
  "esrbRating:16",
  "esrbRating:18",
  "esrbRating:Check the rating",
  "esrbRating:L"
];
var BR_AVAILABILITY_FILTER = ["availability:Pre-order", "availability:Coming soon", "availability:Available now", "availability:New releases"];
var BR_COMMON_GAME_FRANCHISES = ["franchises:Mario", "franchises:Zelda", "franchises:Pok\xE9mon", "franchises:Kirby"];
async function getGamesEurope(options = { limit: EU_GAME_LIST_LIMIT, locale: EU_DEFAULT_LOCALE }) {
  if (!options.limit) options.limit = EU_GAME_LIST_LIMIT;
  if (!options.locale) options.locale = EU_DEFAULT_LOCALE;
  const mergedOptions = { ...EU_GET_GAMES_OPTIONS, ...options };
  const url = new URL(EU_GET_GAMES_URL.replace("{locale}", options.locale));
  url.search = makeURLSearchParams({
    rows: options.limit,
    ...mergedOptions
  }).toString();
  const gamesData = await Result.fromAsync(fetch(url, FetchResultTypes.JSON));
  if (gamesData.isErr()) {
    throw new EshopError("Fetching of EU Games failed");
  }
  return gamesData.unwrap().response.docs;
}
__name(getGamesEurope, "getGamesEurope");
var parser = new XMLParser();
async function getGamesJapan() {
  const response = await Result.fromAsync(fetch(JP_GET_GAMES_URL, FetchResultTypes.Text));
  if (response.isErr()) {
    throw new EshopError("Fetching of JP Games failed");
  }
  const gamesJP = Result.from(() => parser.parse(response.unwrap()));
  if (gamesJP.isErr()) {
    throw new EshopError("Parsing of JP Games failed");
  }
  return gamesJP.unwrap().TitleInfoList.TitleInfo;
}
__name(getGamesJapan, "getGamesJapan");
async function getQueriedGamesAmerica(query, { hitsPerPage = 200, page = 0 } = { hitsPerPage: 200, page: 0 }) {
  const newGamesResult = await Result.fromAsync(
    fetch(
      QUERIED_US_GET_GAMES_URL_NEW,
      {
        method: "POST",
        headers: {
          ...US_ALGOLIA_HEADERS,
          "X-Algolia-API-Key": QUERIED_US_ALGOLIA_KEY_NEW
        },
        body: JSON.stringify({
          hitsPerPage,
          page,
          query
        })
      },
      FetchResultTypes.JSON
    )
  );
  if (newGamesResult.isErr() || newGamesResult.isOkAnd((v) => v.hits.length === 0)) {
    throw new EshopError(`No game results for the query "${query}"`);
  }
  const oldGamesResult = await Result.fromAsync(
    fetch(
      QUERIED_US_GET_GAMES_URL_OLD,
      {
        method: "POST",
        headers: {
          ...US_ALGOLIA_HEADERS,
          "X-Algolia-API-Key": QUERIED_US_ALGOLIA_KEY_OLD
        },
        body: JSON.stringify({
          hitsPerPage,
          page,
          query
        })
      },
      FetchResultTypes.JSON
    )
  );
  if (oldGamesResult.isErr() || oldGamesResult.isOkAnd((v) => v.hits.length === 0)) {
    throw new EshopError(`No game results for the query "${query}"`);
  }
  return enrichNewHitsWithOldHitData(newGamesResult.unwrap().hits, oldGamesResult.unwrap().hits);
}
__name(getQueriedGamesAmerica, "getQueriedGamesAmerica");
function enrichNewHitsWithOldHitData(newHits, oldHits) {
  for (const newHit of newHits) {
    const oldHitWithSameNsuid = oldHits.find((oldHit) => oldHit.nsuid === newHit.nsuid);
    if (!oldHitWithSameNsuid) continue;
    newHit.boxart = oldHitWithSameNsuid.boxart;
    newHit.developers = oldHitWithSameNsuid.developers;
    newHit.freeToStart = oldHitWithSameNsuid.freeToStart;
    newHit.generalFilters = oldHitWithSameNsuid.generalFilters;
    newHit.horizontalHeaderImage = oldHitWithSameNsuid.horizontalHeaderImage;
    newHit.howToShop = oldHitWithSameNsuid.howToShop;
    newHit.lowestPrice = oldHitWithSameNsuid.lowestPrice;
    newHit.msrp = oldHitWithSameNsuid.msrp ?? newHit.price?.regPrice;
    newHit.salePrice = oldHitWithSameNsuid.salePrice ?? newHit.price?.salePrice;
    newHit.featured = oldHitWithSameNsuid.featured ?? newHit.featuredProduct;
    newHit.lastModified = oldHitWithSameNsuid.lastModified ?? newHit.updatedAt;
    newHit.numOfPlayers = oldHitWithSameNsuid.numOfPlayers;
    newHit.playerFilters = oldHitWithSameNsuid.playerFilters;
    newHit._distinctSeqID = oldHitWithSameNsuid._distinctSeqID;
  }
  return newHits;
}
__name(enrichNewHitsWithOldHitData, "enrichNewHitsWithOldHitData");
async function getQueriedGamesBrazil(query, { hitsPerPage = 200, page = 0 } = { hitsPerPage: 200, page: 0 }) {
  const gamesResult = await Result.fromAsync(
    fetch(
      QUERIED_BR_GET_GAMES_URL,
      {
        method: "POST",
        headers: {
          ...BR_ALGOLIA_HEADERS,
          "X-Algolia-API-Key": QUERIED_BR_ALGOLIA_KEY
        },
        body: JSON.stringify({
          params: makeURLSearchParams({
            hitsPerPage,
            page,
            query
          }).toString()
        })
      },
      FetchResultTypes.JSON
    )
  );
  if (gamesResult.isErr() || gamesResult.isOkAnd((v) => v.hits.length === 0)) {
    throw new EshopError(`No game results for the query "${query}"`);
  }
  return gamesResult.unwrap().hits;
}
__name(getQueriedGamesBrazil, "getQueriedGamesBrazil");
async function getPrices(country, gameIds, offset = 0, prices = []) {
  const filteredIds = gameIds.slice(offset, offset + PRICE_LIST_LIMIT);
  const url = new URL(PRICE_GET_URL);
  url.search = makeURLSearchParams({
    country,
    ids: filteredIds,
    limit: PRICE_LIST_LIMIT,
    ...PRICE_GET_OPTIONS
  }).toString();
  const response = await Result.fromAsync(fetch(url, FetchResultTypes.JSON));
  if (response.isErr()) {
    throw new EshopError("Fetching of eShop prices failed");
  }
  const unwrappedResponse = response.unwrap();
  if (unwrappedResponse.prices && unwrappedResponse.prices.length + offset < gameIds.length) {
    const accumulatedPrices = prices.concat(unwrappedResponse.prices);
    return getPrices(country, gameIds, offset + PRICE_LIST_LIMIT, accumulatedPrices);
  } else if (unwrappedResponse.prices) {
    unwrappedResponse.prices = unwrappedResponse.prices.concat(prices);
    return unwrappedResponse;
  }
  return unwrappedResponse;
}
__name(getPrices, "getPrices");

// src/lib/other/getShopByCountryCode.ts
async function getShopsByCountryCodes(countryCodes, gameCode, region) {
  const countryList = countryCodes.map((code) => countries.all.filter((country) => country.alpha2 === code)[0]);
  const shops = [];
  for (const country of countryList) {
    const response = await Result.fromAsync(getPrices(country.alpha2, gameCode));
    if (response.isErr()) {
      continue;
    }
    const unwrappedResponse = response.unwrap();
    unwrappedResponse.country = country;
    shops.push(unwrappedResponse);
  }
  const activeShops = shops.filter((shop) => shop && shop.prices && shop.prices.length && shop.prices[0].regular_price);
  const eShops = activeShops.map((shop) => ({
    code: shop.country.alpha2,
    country: shop.country.name,
    currency: shop.prices[0].regular_price.currency,
    region
  }));
  if (!eShops.length) throw new Error("ACTIVE_SHOPS_Rate_Limit");
  return eShops;
}
__name(getShopsByCountryCodes, "getShopsByCountryCodes");

// src/lib/getShops/getShopsAmerica.ts
async function getShopsAmerica() {
  return getShopsByCountryCodes(
    regions.southAmerica.countries.concat(regions.centralAfrica.countries, regions.northernAmerica.countries),
    US_GAME_CHECK_CODE,
    1 /* AMERICAS */
  );
}
__name(getShopsAmerica, "getShopsAmerica");
async function getShopsAsia() {
  return getShopsByCountryCodes(
    regions.southernAsia.countries.concat(
      regions.southernAsia.countries,
      regions.southeastAsia.countries,
      regions.eastAsia.countries,
      regions.westernAsia.countries
    ),
    JP_GAME_CHECK_CODE,
    3 /* ASIA */
  );
}
__name(getShopsAsia, "getShopsAsia");
async function getShopsEurope() {
  return getShopsByCountryCodes(
    regions.northernEurope.countries.concat(
      regions.southernEurope.countries,
      regions.easternEurope.countries,
      regions.westernEurope.countries,
      regions.australia.countries,
      regions.southernAfrica.countries
    ),
    EU_GAME_CHECK_CODE,
    2 /* EUROPE */
  );
}
__name(getShopsEurope, "getShopsEurope");

// src/lib/getShops/getActiveShops.ts
async function getActiveShops() {
  try {
    const shopsAmerica = await getShopsAmerica();
    const shopsAsia = await getShopsAsia();
    const shopsEurope = await getShopsEurope();
    return shopsAmerica.concat(shopsAsia, shopsEurope);
  } catch (err) {
    throw err;
  }
}
__name(getActiveShops, "getActiveShops");

// src/lib/other/parseGameCode.ts
function parseGameCode(game, region) {
  let codeParse;
  switch (region) {
    case 1 /* AMERICAS */:
      throw new EshopError(
        "`parseGameCode` is not possible for American games as the Nintendo API does not provide enough information to deduce the game code."
      );
    case 2 /* EUROPE */:
      codeParse = EU_GAME_CODE_REGEX.exec(game.product_code_txt[0]);
      break;
    case 3 /* ASIA */:
      codeParse = JP_GAME_CODE_REGEX.exec(game.InitialCode);
      break;
  }
  return codeParse && codeParse.length > 1 ? codeParse[1] : null;
}
__name(parseGameCode, "parseGameCode");

// src/lib/other/parseNSUID.ts
function parseNSUID(game, region) {
  switch (region) {
    case 2 /* EUROPE */:
      return game.nsuid_txt ? game.nsuid_txt[0] : null;
    case 3 /* ASIA */:
      const nsuidParse = JP_NSUID_REGEX.exec(game.LinkURL);
      return nsuidParse && nsuidParse.length > 0 ? nsuidParse[0] : null;
    default:
    case 1 /* AMERICAS */:
      return game.nsuid;
  }
}
__name(parseNSUID, "parseNSUID");
/**
 * Serializes a value to a string, or returns null if it cannot be serialized.
 * @param value - The value to serialize
 * @returns The serialized value, or null if it cannot be serialized
 *
 * @license Apache-2.0
 * @copyright 2021 Noel Buechler
 * Retrieved on 2024-04-27 from https://github.com/discordjs/discord.js/blob/4ad285804bfd72b157139dde61c3fd8ac2544322/packages/rest/src/lib/utils/utils.ts#L8-L47
 */
/**
 * Creates and populates an URLSearchParams instance from an object, stripping
 * out null and undefined values, while also coercing non-strings to strings.
 *
 * @param options - The options to use
 * @returns A populated URLSearchParams instance
 *
 * @license Apache-2.0
 * @copyright 2021 Noel Buechler
 * Retrieved on 2024-04-27 from https://github.com/discordjs/discord.js/blob/4ad285804bfd72b157139dde61c3fd8ac2544322/packages/rest/src/lib/utils/utils.ts#L8-L47
 */
/**
 * Fetches a subset of games from the American e-shops as based on a given query
 * @param query The query to search for
 * @param __namedParameters Additional options for the [[getQueriedGamesAmerica]] call. Defaults to `{ hitsPerPage: 200, page: 0 }`
 * @returns Promise containing the first `hitsPerPage` games that match your query
 * @license Apache-2.0 Jeroen Claassens & Aura Román
 * @copyright 2021
 */
/**
 * Fetches a subset of games from the Brazilian e-shop as based on a given query
 * @param query The query to search for
 * @param __namedParameters Additional options for the [[getQueriedGamesBrazil]] call. Defaults to `{ hitsPerPage: 200, page: 0 }`
 * @returns Promise containing the first `hitsPerPage` games that match your query
 * @license Apache-2.0 Jeroen Claassens & Aura Román
 * @copyright 2021
 */

export { BR_ALGOLIA_HEADERS, BR_ALGOLIA_ID, BR_ALGOLIA_KEY, BR_GET_GAMES_URL, EU_GET_GAMES_URL, EshopError, JP_GET_GAMES_URL, PRICE_GET_URL, QUERIED_BR_ALGOLIA_KEY, QUERIED_BR_GET_GAMES_URL, QUERIED_US_ALGOLIA_KEY_NEW, QUERIED_US_ALGOLIA_KEY_OLD, QUERIED_US_GET_GAMES_URL_NEW, QUERIED_US_GET_GAMES_URL_OLD, Region, US_ALGOLIA_HEADERS, US_ALGOLIA_ID, US_ALGOLIA_KEY, US_GET_GAMES_URL, getActiveShops, getGamesAmerica, getGamesBrazil, getGamesEurope, getGamesJapan, getPrices, getQueriedGamesAmerica, getQueriedGamesBrazil, getShopsAmerica, getShopsAsia, getShopsByCountryCodes, getShopsEurope, parseGameCode, parseNSUID };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map