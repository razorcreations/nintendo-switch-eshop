import { Country } from 'country-data';

/** Algolia ID for getting US games */
declare const US_ALGOLIA_ID = "U3B6GR4UA3";
/** Algolia Key for getting US games */
declare const US_ALGOLIA_KEY = "c4da8be7fd29f0f5bfa42920b0a99dc7";
/** Algolia key for getting US games with a query */
declare const QUERIED_US_ALGOLIA_KEY_NEW = "a29c6927638bfd8cee23993e51e721c9";
/** Algolia key for getting US games with a query */
declare const QUERIED_US_ALGOLIA_KEY_OLD = "6efbfb0f8f80defc44895018caf77504";
/** URL for getting US Games */
declare const US_GET_GAMES_URL = "https://U3B6GR4UA3-dsn.algolia.net/1/indexes/*/queries";
/** New URL for getting Queried US Games */
declare const QUERIED_US_GET_GAMES_URL_NEW = "https://U3B6GR4UA3-dsn.algolia.net/1/indexes/store_all_products_en_us/query";
/** Old URL for getting Queried US games, this still exists and has additional properties which get merged with those from the new URL */
declare const QUERIED_US_GET_GAMES_URL_OLD = "https://U3B6GR4UA3-dsn.algolia.net/1/indexes/ncom_game_en_us/query";
/** @internal Request headers for US games */
declare const US_ALGOLIA_HEADERS: {
    'Content-Type': string;
    'X-Algolia-API-Key': string;
    'X-Algolia-Application-Id': string;
};
/** URL for getting EU Games */
declare const EU_GET_GAMES_URL = "http://search.nintendo-europe.com/{locale}/select";
/** URL for getting JP Games */
declare const JP_GET_GAMES_URL = "https://www.nintendo.co.jp/data/software/xml/switch.xml";
/** Algolia ID for getting BR games */
declare const BR_ALGOLIA_ID = "U3B6GR4UA3";
/** Algolia Key for getting US games */
declare const BR_ALGOLIA_KEY = "c4da8be7fd29f0f5bfa42920b0a99dc7";
/** Algolia key for getting BR games with a query */
declare const QUERIED_BR_ALGOLIA_KEY = "c4da8be7fd29f0f5bfa42920b0a99dc7";
/** URL for getting BR Games */
declare const BR_GET_GAMES_URL = "https://U3B6GR4UA3-dsn.algolia.net/1/indexes/*/queries";
/** URL for getting Queried BR Games */
declare const QUERIED_BR_GET_GAMES_URL = "https://U3B6GR4UA3-dsn.algolia.net/1/indexes/ncom_game_pt_br/query";
/** @internal Request headers for BR games */
declare const BR_ALGOLIA_HEADERS: {
    'Content-Type': string;
    'X-Algolia-API-Key': string;
    'X-Algolia-Application-Id': string;
};
/** URL for getting game prices */
declare const PRICE_GET_URL = "https://api.ec.nintendo.com/v1/price";
/**
 * Predefined options for the unit system
 */
declare const enum Region {
    AMERICAS = 1,
    EUROPE = 2,
    ASIA = 3
}

interface GameEU {
    _version_: number;
    add_on_content_b: boolean;
    age_rating_sorting_i: number;
    age_rating_type: string;
    age_rating_value: string;
    change_date: Date;
    cloud_saves_b: boolean;
    club_nintendo: boolean;
    compatible_controller: string[];
    copyright_s: string;
    date_from: Date;
    dates_released_dts: Date[];
    deprioritise_b: boolean;
    developer: string;
    digital_version_b: boolean;
    eshop_removed_b: boolean;
    excerpt: string;
    fs_id: string;
    game_categories_txt: string[];
    game_category: string[];
    game_series_t: string;
    gift_finder_carousel_image_url_s: string;
    gift_finder_description_s: string;
    gift_finder_detail_page_image_url_s: string;
    gift_finder_detail_page_store_link_s: string;
    gift_finder_wishlist_image_url_s: string;
    hits_i: number;
    image_url: string;
    image_url_h2x1_s: string;
    image_url_sq_s: string;
    image_url_tm_s: string;
    language_availability: string[];
    near_field_comm_b: boolean;
    /** Array containing the 14-digit game unique identifier */
    nsuid_txt: string[];
    originally_for_t: string;
    pg_s: string;
    physical_version_b: boolean;
    play_mode_handheld_mode_b: boolean;
    play_mode_tabletop_mode_b: boolean;
    play_mode_tv_mode_b: boolean;
    playable_on_txt: string[];
    players_from: number;
    players_to: number;
    popularity: number;
    pretty_agerating_s: string;
    pretty_date_s: string;
    pretty_game_categories_txt: string[];
    price_discount_percentage_f: number;
    price_has_discount_b: boolean;
    price_lowest_f: number;
    price_regular_f: number;
    price_sorting_f: number;
    priority: Date;
    product_catalog_description_s: string;
    product_code_ss: string[];
    /** Array containing the product code */
    product_code_txt: string[];
    publisher: string;
    sorting_title: string;
    switch_game_voucher_b: boolean;
    system_names_txt: string[];
    system_type: string[];
    title: string;
    title_extras_txt: string[];
    type: string;
    /** the url path of the game on the eShop website - does not include domain **/
    url: string;
    wishlist_email_banner460w_image_url_s: string;
    wishlist_email_banner640w_image_url_s: string;
    wishlist_email_square_image_url_s: string;
}
/** Additional options for the [[getQueriedGamesAmerica]] method  */
interface QueriedGamesAmericaOptions {
    /**
     * The amount of hits to be received per page
     * @minimum 0
     * @maximum 200
     * @default 200
     */
    hitsPerPage?: number;
    /**
     * The page number to get
     * @minimum 0
     * @default 0
     */
    page?: number;
}
interface QueriedGameResult {
    /** Whether the amount of hits is exhaustive or not */
    exhaustiveNbHits: true;
    /** The hits for this query */
    hits: QueriedGameUS[];
    /** The amount of hits per page */
    hitsPerPage: number;
    /** The amount of hits */
    nbHits: number;
    /** The amount of pages available */
    nbPages: number;
    /** The page that the result is on */
    page: number;
    /** The params that were used */
    params: string;
    /** The amount of time it took the {@link https://www.nintendo.com nintendo.com} API to process this request */
    processingTimeMS: number;
    /** The query that was used */
    query: string;
}
interface QueriedGameUS {
    /** Additional information returned by the API, it doesn't really serve any purpose but documenting it anyway because it's there. */
    _distinctSeqID: number;
    /** Additional information returned by the API, it doesn't really serve any purpose but documenting it anyway because it's there. */
    _highlightResult: HighlightResult;
    /** Whether this game is available or not */
    availability: string[];
    /** The box art of the game, if any. Generally undefined for games that are yet to release. */
    boxart?: string;
    classindDescriptors?: unknown | null;
    classindRating?: unknown | null;
    collectionPriceRange: string;
    contentRatingCode: string;
    corePlatforms: string[];
    createdAt: Date;
    demoNsuid: string | null;
    depth?: number;
    /** A description about this game */
    description: string;
    /** A list of companies that developed this game */
    developers: string[];
    /** A list of {@link https://www.esrb.org/ratings-guide/ ESRB descriptors} */
    esrbDescriptors: string[];
    /** The {@link https://www.esrb.org/ratings-guide/ ESRB Rating} */
    esrbRating: string;
    exclusive: boolean;
    /** Whether this game is featured on the {@link https://www.nintendo.com nintendo.com} homepage */
    featured: boolean;
    /** Whether this game is featured on the {@link https://www.nintendo.com nintendo.com} homepage */
    featuredProduct: boolean;
    /** The franchises this game is a part of */
    franchises: string;
    /** Whether this game is free to start */
    freeToStart: boolean;
    /** A list of general filters that could potentially be searched on {@link https://www.nintendo.com nintendo.com} to find this game with */
    generalFilters: string[];
    /**  A list of genres this game */
    genres: string[];
    /** Whether this game has downloadable content or not */
    hasDlc: boolean;
    /** A large wide image such as a screenshot or artwork of the game, if any. */
    headerImage?: string;
    /** The asset slug of a large wide image such as a screenshot or artwork of the game, if any. */
    horizontalHeaderImage?: string;
    /** A list of methods through which the game can be acquired, such as retail or digital download. */
    howToShop: string[];
    /** A Unix timestamp in **milliseconds** indicating when the information on this game was last modified */
    lastModified: number;
    /** The lowest price at which this game was ever sold */
    lowestPrice: number;
    /** The {@link https://en.wikipedia.org/wiki/List_price manufacturer's suggested retail price} for this game */
    msrp: number;
    /** Features that added to this game when the player has a Nintendo Switch Online subscription */
    nsoFeatures: string[];
    /** The unique ID for this game. */
    nsuid: string;
    /** The amount of players that can simultaneously play this game */
    numOfPlayers: string;
    /** A unique {@link https://en.wikipedia.org/wiki/Universally_unique_identifier GUID} that represents this game's entry in the Nintendo API.  */
    objectID: string;
    /** The platform this game released on */
    platform: string;
    /**
     * A unique identifier of the platform the game was released on
     * @example 'NINTENDO_SWITCH'
     */
    platformCode: string;
    platinumPoints?: any;
    /**
     * The amount of players that can simultaniously play this game
     * @example 'Single Player'
     */
    playerCount: string;
    /** A list of player filters that could potentially be searched on {@link https://www.nintendo.com nintendo.com} to find this game with */
    playerFilters: string[];
    /**
     * An array of ways this game can be played
     * @example ['TV mode', 'Tabletop mode', 'Handheld mode']
     */
    playModes: string[];
    /** The price information for this game */
    price: {
        /** The regular price for this game */
        regPrice: number;
        /**
         * The final price for this game,
         * which is {@link QueriedGameUS.price.salePrice} if the game is on sale or {@link QueriedGameUS.price.regPrice} if it is not.
         */
        finalPrice: number;
        /**
         * The sale price for this game, or `null` if the game has never been on sale.
         */
        salePrice: number | null;
    };
    /** A category price range that this game falls under. Can be used on {@link https://www.nintendo.com nintendo.com} to find this game with */
    priceRange: string;
    priority?: number;
    /** The slug to a product image of this game */
    productImage: string;
    /** The date this game was published */
    publishDate?: Date;
    /** A list of companies that published this game */
    publishers: string[];
    /**
     * A display of the release of this game. Can be either an ISO timestamp or some other representation of date.
     * @remark Nintendo has a tendency to also have entries such as `Early 2022` or `Late 2021` here. Normally these kinds of dates would not be parsed by JavaScript, but NodeJS does parse these natural input types.
     */
    releaseDateDisplay: string;
    /** The price of this game if and when it is on sale */
    salePrice: number | null;
    /** the SKU ID for this game  */
    sku: string;
    /** A unique {@link https://en.wikipedia.org/wiki/Clean_URL#Slug slug} for this game */
    slug: string;
    /**
     * The SMEC ({@link https://en.wikipedia.org/wiki/Video_game_content_rating_system#Mexico Sistema Mexicano de Equivalencias de Clasificación})
     * descriptors for this game
     */
    smecDescriptors: string[];
    /**
     * The SMEC ({@link https://en.wikipedia.org/wiki/Video_game_content_rating_system#Mexico Sistema Mexicano de Equivalencias de Clasificación})
     * rating for this game
     */
    smecRating: string;
    /**
     * The developer of this game
     */
    softwareDeveloper: string;
    /**
     * The publisher of this game
     */
    softwarePublisher: string;
    /** The title of this game */
    title: string;
    /**
     * The top level category of this game
     * @example 'Games'
     */
    topLevelCategory: string;
    /**
     * The top level category code of this game
     * @example 'GAMES'
     */
    topLevelCategoryCode: string;
    /** The top level filters for this game */
    topLevelFilters: string[];
    /**
     * The type of search result
     * @example 'game'
     */
    type: string;
    /**
     * An ISO timestamp of when this game was last updated
     */
    updatedAt: string;
    /** A unique to the information about this game. Prefix it with `https://www.nintendo.com` to have a valid URL. */
    url: string;
    /**
     * The key segment of the {@link QueriedGameUS.url}, often the last segment of the URL
     */
    urlKey: string;
    /** Whether this game is visible when searching for it on https://www.nintendo.com */
    visibleInSearch: boolean;
}
interface HighlightResult {
    nsuid: Nsuid;
    publishers: Nsuid[];
    title: Nsuid;
}
interface Nsuid {
    fullyHighlighted?: boolean;
    matchedWords: string[];
    matchLevel: string;
    value: string;
}
interface GameUS {
    /** Identifiers about the availability of this game. */
    availability: string[];
    /** The boxart of this title, if this is an eShop game then it is the homescreen icon */
    boxart: string;
    /** A longer description about this title */
    description: string;
    /** The studios that developed this gamme */
    developers: string[];
    /** An array of ESRB descriptions such as `"Alcohol Reference"` and `"Violence"` */
    esrbDescriptors: string[];
    /** The {@linkplain https://www.esrb.org ESRB} rating this game was given */
    esrbRating: string;
    /** Whether this game is featured on {@linkplain https://nintendo.com}'s homepage */
    featured: boolean;
    /** The franches this game is part of */
    franchises: string[];
    /** Whether this game is free to start and only needs payment later */
    freeToStart: boolean;
    /** Qualifiers that could be used to find this game when applying filters on {@linkplain https://nintendo.com} */
    generalFilters: string[];
    /** The genres this this game is part of */
    genres: string[];
    /** A larger header image */
    horizontalHeaderImage: string;
    /** A list of ways this game can be purchased */
    howToShop: string[];
    /** Unix timestamp when this entry was last edited on the API */
    lastModified: number;
    /** The lowest price this game was ever available for. */
    lowestPrice: number;
    /** The {@linkplain https://en.wikipedia.org/wiki/List_price Manufacturer's Suggested Retail Price} for this game (in United States Dollars). */
    msrp: number;
    /** 14-digit game unique identifier */
    nsuid: string;
    /** The amount of players this game supports. This is a string because Nintendo is more verbose than just a number. */
    numOfPlayers: string;
    /** The internal ID that Nintendo has assigned to this game in their API. This doesn't really serve any use. */
    objectID: string;
    /** The platform on which this game was released */
    platform: string;
    /** Qualifiers that could be used to find this game when applying player filters on {@linkplain https://nintendo.com}  */
    playerFilters: string[];
    /** The predefined price range in which this game falls, can be used when applying filters on {@linkplain https://nintendo.com} */
    priceRange: string;
    /** The studios that published this game */
    publishers: string[];
    /** The date this game was released in the {@linkplain https://en.wikipedia.org/wiki/ISO_8601 ISO 8601 Extended Format}  */
    releaseDateDisplay: string;
    /** The price for this game when it is on sale. This is `null` when the game is _not_ on sale. */
    salePrice: number | null;
    /** Game URL name */
    slug: string;
    /** The title of the game */
    title: string;
    /** The URL to the game on {@linkplain https://nintendo.com}. Prepend `https://nintend.com` to this URL to get a fully qualified URL to the game. */
    url: string;
}
interface GameJP extends Record<string, string | number | undefined> {
    ComingThumb: 'yes' | string;
    D: number;
    Hard: string;
    /** The game code for the game */
    InitialCode: string;
    /** The Link Target, if it exists */
    LinkTarget: string;
    /** The game url */
    LinkURL: string;
    MakerKana: string;
    MakerName: string;
    Memo: string;
    PlatformID: string;
    Price: string;
    SalesDate: string;
    /** The type of screenshot, if it exists */
    ScreenshotImgFlg: number;
    /** The screenshot URL, if it exists */
    ScreenshotImgURL: string;
    SoftType: string;
    /** The variation of the thumbnail */
    ThumbVariation: string;
    /** The game's title */
    TitleName: string;
    /** The title name in Asian characters */
    TitleNameRuby: string;
}
interface EShop {
    code: string;
    country: string;
    currency: string;
    region: Region;
}
interface PriceResponse {
    country: Country;
    error: PriceError;
    personalized: boolean;
    prices: TitleData[];
}
interface TitleData {
    discount_price?: PriceData;
    regular_price: PriceData;
    sales_status: string;
    title_id: number;
}
/** @internal */
interface PriceError {
    code: string;
    message: string;
}
/** @internal */
interface PriceData {
    amount: string;
    currency: string;
    end_datetime?: string;
    raw_value: string;
    start_datetime?: string;
}
/** @internal */
interface RequestOptions {
    /**
     * Game count limit (Can only be lower than default page size).
     *
     * @remarks
     * On the US eshop, the max limit is 100. Leave empty to get all the games. */
    limit?: number;
}
interface EURequestOptions extends RequestOptions {
    /** Game information locale. (EU Only) */
    locale?: string;
}

/**
 * Fetches all games on american e-shops
 *
 * @remarks
 * Currently ONLY returns all games in the e-shop
 *
 * @returns Promise containing all the games
 */
declare function getGamesAmerica(): Promise<GameUS[]>;

/**
 * Fetches all games on brazilian e-shop
 *
 * @remarks
 * Currently ONLY returns all games in the e-shop
 *
 * @returns Promise containing all the games
 */
declare function getGamesBrazil(): Promise<GameUS[]>;

/**
 * Fetches all games on the European, Australian or New Zealand eShops
 *
 * @remarks
 * Games from Australia / New Zealand can be limited. They are included only as much as that Nintendo assigns them properly to the PAL region
 *
 * @param options - Request options to pass to the eShop request {@link EURequestOptions | See EURequestOptions for details}
 * @returns Promise containing all requested EU/PAL games
 */
declare function getGamesEurope(options?: EURequestOptions): Promise<GameEU[]>;

/**
 * Fetches all games on japanese eShops
 *
 * @returns Promise containing all the games
 */
declare function getGamesJapan(): Promise<GameJP[]>;

/**
 * Fetches a subset of games from the American e-shops as based on a given query
 * @param query The query to search for
 * @param __namedParameters Additional options for the [[getQueriedGamesAmerica]] call. Defaults to `{ hitsPerPage: 200, page: 0 }`
 * @returns Promise containing the first `hitsPerPage` games that match your query
 * @license Apache-2.0 Jeroen Claassens & Aura Román
 * @copyright 2021
 */
declare function getQueriedGamesAmerica(query: string, { hitsPerPage, page }?: QueriedGamesAmericaOptions): Promise<QueriedGameUS[]>;

/**
 * Fetches a subset of games from the Brazilian e-shop as based on a given query
 * @param query The query to search for
 * @param __namedParameters Additional options for the [[getQueriedGamesBrazil]] call. Defaults to `{ hitsPerPage: 200, page: 0 }`
 * @returns Promise containing the first `hitsPerPage` games that match your query
 * @license Apache-2.0 Jeroen Claassens & Aura Román
 * @copyright 2021
 */
declare function getQueriedGamesBrazil(query: string, { hitsPerPage, page }?: QueriedGamesAmericaOptions): Promise<QueriedGameUS[]>;

/**
 * Gets all active eShops.
 *
 * @remarks
 * This method will launch several requests at nintendo web services, so don't abuse it.
 *
 * @returns A list of shop objects with country code, name and default currency.
 */
declare function getActiveShops(): Promise<EShop[]>;

/**
 * Gets all active eShops on American countries.
 *
 * @remarks
 * This method will launch several requests at nintendo web services, so don't abuse it.
 *
 * @returns A list of shop objects with country code, name and default currency.
 */
declare function getShopsAmerica(): Promise<EShop[]>;

/**
 * Gets all active eShops on Asian countries
 *
 * @remarks
 * This method will launch several requests at nintendo web services, so don't abuse it.
 *
 * @returns A list of shop objects with country code, name and default currency.
 */
declare function getShopsAsia(): Promise<EShop[]>;

/**
 * Gets all active eShops on European countries.
 *
 * @remarks
 * This method will launch several requests at nintendo web services, so don't abuse it.
 *
 * @returns A list of shop objects with country code, name and default currency.
 */
declare function getShopsEurope(): Promise<EShop[]>;

/**
 * Gets pricing information for the requested games. Paginates every 50 games.
 *
 * @param country A two digit country code. (ISO 3166-1 alpha-2 country code)
 * @param gameIds One or more NSUID of the corresponding games.
 * @param offset _(Optional)_ The offset to start at
 * @param prices _(Optional)_ An array of {@link TitleData}
 * @returns A promise containing the pricing information.
 */
declare function getPrices(country: string, gameIds: string[] | string, offset?: number, prices?: TitleData[]): Promise<PriceResponse>;

/**
 * Gets all active eShops given a list of countries.
 *
 * @param countryCodes A list of 2 digit country codes for every country eShop to lookup. (ISO 3166-1 alpha-2 country codes)
 * @param gameCode A 14 digits game NSUID from the desired region.
 * @param region A region id that will be appended in the final shop object for filtering purposes.
 * @returns A list of shop objects with country code, name and default currency.
 */
declare function getShopsByCountryCodes(countryCodes: string[], gameCode: string, region: Region): Promise<EShop[]>;

/**
 * Parses the game code to extract the cross-region portion.
 *
 * @param game The game object returned from one of the other methods.
 * @param region Region code
 * @returns The 4-digit resulting game code
 */
declare function parseGameCode(game: GameUS | GameEU | GameJP, region: Region): string | null;

/**
 * Extracts NSUID information from the game object.
 *
 * @param game The game object returned from one of the other methods.
 * @param region Region code
 * @returns The 14-digits NSUID
 */
declare function parseNSUID(game: GameUS | GameEU | GameJP, region: Region): string | null;

/** Class representing an error in the nintendo-switch-eshop library */
declare class EshopError extends Error {
    /**
     * Create an EshopError
     * @param message The message the error should show
     */
    constructor(message: string);
}

export { BR_ALGOLIA_HEADERS, BR_ALGOLIA_ID, BR_ALGOLIA_KEY, BR_GET_GAMES_URL, type EShop, type EURequestOptions, EU_GET_GAMES_URL, EshopError, type GameEU, type GameJP, type GameUS, type HighlightResult, JP_GET_GAMES_URL, type Nsuid, PRICE_GET_URL, type PriceResponse, QUERIED_BR_ALGOLIA_KEY, QUERIED_BR_GET_GAMES_URL, QUERIED_US_ALGOLIA_KEY_NEW, QUERIED_US_ALGOLIA_KEY_OLD, QUERIED_US_GET_GAMES_URL_NEW, QUERIED_US_GET_GAMES_URL_OLD, type QueriedGameResult, type QueriedGameUS, type QueriedGamesAmericaOptions, Region, type TitleData, US_ALGOLIA_HEADERS, US_ALGOLIA_ID, US_ALGOLIA_KEY, US_GET_GAMES_URL, getActiveShops, getGamesAmerica, getGamesBrazil, getGamesEurope, getGamesJapan, getPrices, getQueriedGamesAmerica, getQueriedGamesBrazil, getShopsAmerica, getShopsAsia, getShopsByCountryCodes, getShopsEurope, parseGameCode, parseNSUID };
