export interface ApiGame {
    games: GameElement[];
    count: number;
}

export interface GameElement {
    id:                          string;
    handle:                      string;
    url:                         string;
    edit_url:                    string;
    name:                        string;
    price:                       string;
    price_ca:                    string;
    price_uk:                    string;
    price_au:                    string;
    msrp:                        number;
    msrps:                       Msrp[];
    discount:                    string;
    year_published:              number;
    min_players:                 number;
    max_players:                 number;
    min_playtime:                number;
    max_playtime:                number;
    min_age:                     number;
    description:                 string;
    commentary:                  string;
    faq:                         string;
    thumb_url:                   string;
    image_url:                   string;
    matches_specs:               null;
    specs:                       any[];
    mechanics:                   Category[];
    categories:                  Category[];
    publishers:                  Designer[];
    designers:                   Designer[];
    primary_publisher:           Primary;
    primary_designer?:           Primary;
    developers:                  any[];
    related_to:                  any[];
    related_as:                  Type[];
    artists:                     string[];
    names:                       string[];
    rules_url?:                  null | string;
    amazon_rank?:                number;
    official_url:                null | string;
    sell_sheet_url?:             null;
    store_images_url?:           null;
    comment_count:               number;
    num_user_ratings:            number;
    average_user_rating:         number;
    size_height?:                number;
    historical_low_prices:       HistoricalLowPrice[];
    active:                      boolean;
    num_user_complexity_votes:   number;
    average_learning_complexity: number;
    average_strategy_complexity: number;
    visits:                      number;
    lists:                       number;
    mentions:                    number;
    links:                       number;
    plays:                       number;
    rank:                        number;
    type:                        Type;
    sku?:                        string;
    upc?:                        string;
    num_distributors:            number;
    trending_rank:               number;
    listing_clicks:              number;
    is_historical_low:           boolean;
    skus?:                       string[];
    sku_objects?:                SkuObject[];
    players:                     string;
    playtime:                    string;
    msrp_text?:                  string;
    price_text:                  string;
    tags:                        string[];
    images:                      Images;
    description_preview:         string;
    cs_rating?:                  number;
    weight_amount?:              number;
    weight_units?:               string;
    size_depth?:                 number;
    size_units?:                 string;
}

export interface Category {
    id:  string;
    url: string;
}

export interface Designer {
    id:        string;
    num_games: null;
    score:     number;
    game:      DesignerGame;
    url:       string;
    images:    Images;
}

export interface DesignerGame {
}

export interface Images {
    thumb:    null | string;
    small:    null | string;
    medium:   null | string;
    large:    null | string;
    original: null | string;
}

export interface HistoricalLowPrice {
    country: Country;
    date:    string;
    price:   number;
    isLow:   boolean;
}

export enum Country {
    Au = "AU",
    CA = "CA",
    Uk = "UK",
    Us = "US",
}

export interface Msrp {
    country: Country;
    price:   number;
}

export interface Primary {
    id?:   ID;
    name?: PrimaryDesignerName;
    url?:  string;
}

export enum ID {
    EJue6JPxqV = "eJue6JPxqV",
    FLH8TXTBBp = "fLH8tXTBBp",
    LCjyh7WnHD = "LCjyh7WnHd",
    RY4XltbNAz = "RY4XltbNAz",
    The1LE7Oe5KVZ = "1LE7oe5KVZ",
    The7GTti1NuCH = "7GTti1NuCH",
}

export enum PrimaryDesignerName {
    Asmodee = "Asmodee",
    CatanStudio = "Catan Studio",
    FantasyFlightGames = "Fantasy Flight Games",
    KlausTeuber = "Klaus Teuber",
    Kosmos = "KOSMOS",
    MayfairGames = "Mayfair Games",
}

export enum Type {
    Expansion = "expansion",
    Game = "game",
}

export interface SkuObject {
    name: SkuObjectName;
    sku:  string;
}

export enum SkuObjectName {
    BoardingSchoolGames = "Boarding School Games",
    Boardlandia = "Boardlandia",
    CardHaus = "Card Haus",
    GamesParadise = "Games Paradise",
    Guf = "Guf",
    NobleKnightGames = "Noble Knight Games",
}



