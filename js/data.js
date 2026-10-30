/* =====================================================================
   PORTAL_DATA – nơi DUY NHẤT cần sửa để thêm / bớt / đổi ứng dụng.
   ---------------------------------------------------------------------
  apps:    id -> [ "Tên hiển thị", "URL mở ra", { mode, tuỳ chọn } ]
            tuỳ chọn: icon  = link ảnh riêng hoặc file nội bộ ("assets/x.png")
                      slug  = tên icon trên simpleicons.org (dự phòng)
                      bg    = màu nền ô icon (mặc định trắng)
               fit   = "cover" để ảnh lấp đầy ô icon
               mode  = "work", "shopping", "entertainment" hoặc "games"
   folders: id -> { name, apps: [id, ...] }
   layout:  dock + pages. Mỗi mục là "app:<id>" hoặc "folder:<id>"
   iconProviders: thứ tự thử lấy icon thật. {url} {domain} {slug}
   ===================================================================== */
const APP_MODES = Object.freeze({
  ALL: "all",
  WORK: "work",
  SHOPPING: "shopping",
  ENTERTAINMENT: "entertainment",
  GAMES: "games"
});

const PORTAL_DATA = {
  settings: {
    openTarget: "_blank",
    wallpaperDefault: 0,
    wallpapers: [
      "radial-gradient(120% 80% at 20% 10%, #5b7cff 0%, transparent 55%), radial-gradient(100% 80% at 90% 30%, #ff7ab8 0%, transparent 50%), linear-gradient(160deg, #1b1f4b, #0c0f26)",
      "radial-gradient(110% 80% at 80% 0%, #ffb35c 0%, transparent 55%), linear-gradient(170deg, #ff5f6d, #3b1d5e)",
      "radial-gradient(100% 70% at 30% 100%, #2fe0b5 0%, transparent 55%), linear-gradient(180deg, #0b2a4a, #05121f)",
      "linear-gradient(180deg, #111, #2a2a2e)"
    ],
    iconProviders: [
      "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url={url}&size=128",
      "https://www.google.com/s2/favicons?domain={domain}&sz=128",
      "https://icons.duckduckgo.com/ip3/{domain}.ico",
      "https://cdn.simpleicons.org/{slug}"
    ]
  },

  apps: {
    /* ---------- Google ---------- */
    google: ["Google", "https://www.google.com", { mode: APP_MODES.WORK }],
    gmail: ["Gmail", "https://mail.google.com", { mode: APP_MODES.WORK }],
    drive: ["Drive", "https://drive.google.com", { mode: APP_MODES.WORK }],
    docs: ["Docs", "https://docs.google.com/document/u/0/", { mode: APP_MODES.WORK }],
    sheets: ["Sheets", "https://docs.google.com/spreadsheets/u/0/", { mode: APP_MODES.WORK }],
    slides: ["Slides", "https://docs.google.com/presentation/u/0/", { mode: APP_MODES.WORK }],
    forms: ["Forms", "https://docs.google.com/forms/u/0/", { mode: APP_MODES.WORK }],
    calendar: ["Lịch", "https://calendar.google.com", { mode: APP_MODES.WORK }],
    meet: ["Meet", "https://meet.google.com", { mode: APP_MODES.WORK }],
    maps: ["Maps", "https://maps.google.com", { mode: APP_MODES.WORK }],
    photos: ["Ảnh", "https://photos.google.com", { mode: APP_MODES.WORK }],
    youtube: ["YouTube", "https://www.youtube.com", { mode: APP_MODES.ENTERTAINMENT }],
    ytmusic: ["YT Music", "https://music.youtube.com", { mode: APP_MODES.ENTERTAINMENT }],
    translate: ["Dịch", "https://translate.google.com", { mode: APP_MODES.WORK }],
    keep: ["Keep", "https://keep.google.com", { mode: APP_MODES.WORK }],
    gchat: ["Chat", "https://chat.google.com", { mode: APP_MODES.WORK }],
    gemini: ["Gemini", "https://gemini.google.com", { mode: APP_MODES.WORK }],
    notebooklm: ["NotebookLM", "https://notebooklm.google.com", { mode: APP_MODES.WORK }],
    aistudio: ["AI Studio", "https://aistudio.google.com", { mode: APP_MODES.WORK }],
    earth: ["Earth", "https://earth.google.com/web/", { mode: APP_MODES.WORK }],
    gnews: ["Google News", "https://news.google.com", { mode: APP_MODES.ENTERTAINMENT }],
    scholar: ["Scholar", "https://scholar.google.com", { mode: APP_MODES.WORK }],
    playstore: ["Play", "https://play.google.com", { mode: APP_MODES.WORK }],
    analytics: ["Analytics", "https://analytics.google.com", { mode: APP_MODES.WORK }],

    /* ---------- Microsoft ---------- */
    m365: ["Microsoft 365", "https://www.office.com", { mode: APP_MODES.WORK }],
    outlook: ["Outlook", "https://outlook.live.com/mail/", { mode: APP_MODES.WORK }],
    word: ["Word", "https://www.office.com/launch/word", { mode: APP_MODES.WORK }],
    excel: ["Excel", "https://www.office.com/launch/excel", { mode: APP_MODES.WORK }],
    powerpoint: ["PowerPoint", "https://www.office.com/launch/powerpoint", { mode: APP_MODES.WORK }],
    onenote: ["OneNote", "https://www.onenote.com", { mode: APP_MODES.WORK }],
    onedrive: ["OneDrive", "https://onedrive.live.com", { mode: APP_MODES.WORK }],
    teams: ["Teams", "https://teams.microsoft.com", { mode: APP_MODES.WORK }],
    todo: ["To Do", "https://to-do.live.com", { mode: APP_MODES.WORK }],
    bing: ["Bing", "https://www.bing.com", { mode: APP_MODES.WORK }],
    copilot: ["Copilot", "https://copilot.microsoft.com", { mode: APP_MODES.WORK }],
    azure: ["Azure", "https://portal.azure.com", { mode: APP_MODES.WORK }],
    xboxcloud: ["Xbox Cloud", "https://www.xbox.com/play", { mode: APP_MODES.GAMES }],

    /* ---------- Meta ---------- */
    facebook: ["Facebook", "https://www.facebook.com", { mode: APP_MODES.ENTERTAINMENT }],
    fbwatch: ["FB Watch", "https://www.facebook.com/watch", { mode: APP_MODES.ENTERTAINMENT }],
    fbmarket: ["Marketplace", "https://www.facebook.com/marketplace", { mode: APP_MODES.SHOPPING }],
    fbnews: ["FB Tin tức", "https://www.facebook.com/news", { mode: APP_MODES.ENTERTAINMENT }],
    messenger: ["Messenger", "https://www.messenger.com", { mode: APP_MODES.WORK }],
    instagram: ["Instagram", "https://www.instagram.com", { mode: APP_MODES.ENTERTAINMENT }],
    whatsapp: ["WhatsApp", "https://web.whatsapp.com", { mode: APP_MODES.WORK }],
    threads: ["Threads", "https://www.threads.com", { mode: APP_MODES.ENTERTAINMENT }],
    metaai: ["Meta AI", "https://www.meta.ai", { mode: APP_MODES.WORK }],

    /* ---------- Mạng xã hội ---------- */
    tiktok: ["TikTok", "https://www.tiktok.com", { mode: APP_MODES.ENTERTAINMENT }],
    x: ["X", "https://x.com", { mode: APP_MODES.ENTERTAINMENT }],
    reddit: ["Reddit", "https://www.reddit.com", { mode: APP_MODES.ENTERTAINMENT }],
    pinterest: ["Pinterest", "https://www.pinterest.com", { mode: APP_MODES.ENTERTAINMENT }],
    linkedin: ["LinkedIn", "https://www.linkedin.com", { mode: APP_MODES.WORK }],
    snapchat: ["Snapchat", "https://www.snapchat.com", { mode: APP_MODES.ENTERTAINMENT }],
    telegram: ["Telegram", "https://web.telegram.org", { mode: APP_MODES.WORK }],
    discord: ["Discord", "https://discord.com/app", { mode: APP_MODES.WORK }],
    zalo: ["Zalo", "https://chat.zalo.me", { mode: APP_MODES.WORK }],
    tumblr: ["Tumblr", "https://www.tumblr.com", { mode: APP_MODES.ENTERTAINMENT }],
    bluesky: ["Bluesky", "https://bsky.app", { mode: APP_MODES.ENTERTAINMENT }],
    bereal: ["BeReal", "https://bereal.com", { mode: APP_MODES.ENTERTAINMENT }],
    lemon8: ["Lemon8", "https://www.lemon8-app.com", { mode: APP_MODES.ENTERTAINMENT }],
    mastodon: ["Mastodon", "https://joinmastodon.org", { mode: APP_MODES.ENTERTAINMENT }],

    /* ---------- Giải trí ---------- */
    netflix: ["Netflix", "https://www.netflix.com", { mode: APP_MODES.ENTERTAINMENT }],
    spotify: ["Spotify", "https://open.spotify.com", { mode: APP_MODES.ENTERTAINMENT }],
    twitch: ["Twitch", "https://www.twitch.tv", { mode: APP_MODES.ENTERTAINMENT }],
    disney: ["Disney+", "https://www.disneyplus.com", { mode: APP_MODES.ENTERTAINMENT }],
    prime: ["Prime Video", "https://www.primevideo.com", { mode: APP_MODES.ENTERTAINMENT }],
    soundcloud: ["SoundCloud", "https://soundcloud.com", { mode: APP_MODES.ENTERTAINMENT }],
    zingmp3: ["Zing MP3", "https://zingmp3.vn", { mode: APP_MODES.ENTERTAINMENT }],
    bilibili: ["Bilibili", "https://www.bilibili.com", { mode: APP_MODES.ENTERTAINMENT }],
    sctv: ["SCTV", "https://sctvonline.vn", { mode: APP_MODES.ENTERTAINMENT }],
    kplus: ["K+", "https://www.kplus.vn", { mode: APP_MODES.ENTERTAINMENT }],
    hbo: ["HBO Max", "https://play.max.com", { mode: APP_MODES.ENTERTAINMENT }],
    appletv: ["Apple TV", "https://tv.apple.com", { mode: APP_MODES.ENTERTAINMENT }],
    youtubekids: ["YouTube Kids", "https://www.youtube.com/kids", { mode: APP_MODES.ENTERTAINMENT }],
    crunchyroll: ["Crunchyroll", "https://www.crunchyroll.com", { mode: APP_MODES.ENTERTAINMENT }],
    retrocrush: ["RetroCrush", "https://www.retrocrush.tv", { mode: APP_MODES.ENTERTAINMENT }],
    pops: ["POPS", "https://pops.vn", { mode: APP_MODES.ENTERTAINMENT }],
    anilist: ["AniList", "https://anilist.co", { mode: APP_MODES.ENTERTAINMENT }],
    myanimelist: ["MyAnimeList", "https://myanimelist.net", { mode: APP_MODES.ENTERTAINMENT }],
    animenewsnetwork: ["Anime News Network", "https://www.animenewsnetwork.com", { mode: APP_MODES.ENTERTAINMENT }],
    tramanime: ["Trạm Anime", "https://tramanime.com", { mode: APP_MODES.ENTERTAINMENT }],
    mangaplus: ["MANGA Plus", "https://mangaplus.shueisha.co.jp", { mode: APP_MODES.ENTERTAINMENT }],
    viz: ["VIZ Manga", "https://www.viz.com", { mode: APP_MODES.ENTERTAINMENT }],
    webtoon: ["WEBTOON", "https://www.webtoons.com", { mode: APP_MODES.ENTERTAINMENT }],
    tapas: ["Tapas", "https://tapas.io", { mode: APP_MODES.ENTERTAINMENT }],
    comicwalker: ["ComicWalker", "https://comic-walker.com", { mode: APP_MODES.ENTERTAINMENT }],

    /* ---------- Ứng dụng phổ biến tại Việt Nam ---------- */
    capcut: ["CapCut", "https://www.capcut.com", { mode: APP_MODES.WORK }],
    meitu: ["Meitu", "https://www.meituxiuxiu.com", { mode: APP_MODES.WORK }],
    locket: ["Locket Widget", "https://locket.camera", { mode: APP_MODES.ENTERTAINMENT }],
    weplay: ["WePlay", "https://weplayapp.com", { mode: APP_MODES.GAMES }],
    tinder: ["Tinder", "https://tinder.com", { mode: APP_MODES.ENTERTAINMENT }],
    vieon: ["VieON", "https://vieon.vn", { mode: APP_MODES.ENTERTAINMENT }],
    fptplay: ["FPT Play", "https://fptplay.vn", { mode: APP_MODES.ENTERTAINMENT }],
    tv360: ["TV360", "https://tv360.vn", { mode: APP_MODES.ENTERTAINMENT }],
    vtvgo: ["VTVgo", "https://vtvgo.vn", { mode: APP_MODES.ENTERTAINMENT }],
    hypic: ["Hypic", "https://hypic.capcut.com", { mode: APP_MODES.WORK }],
    bandlab: ["BandLab", "https://www.bandlab.com", { mode: APP_MODES.WORK }],
    applemusic: ["Apple Music", "https://music.apple.com", { mode: APP_MODES.ENTERTAINMENT }],
    deezer: ["Deezer", "https://www.deezer.com", { mode: APP_MODES.ENTERTAINMENT }],
    bandcamp: ["Bandcamp", "https://bandcamp.com", { mode: APP_MODES.ENTERTAINMENT }],
    tidal: ["TIDAL", "https://tidal.com", { mode: APP_MODES.ENTERTAINMENT }],
    nhaccuatui: ["NhacCuaTui", "https://www.nhaccuatui.com", { mode: APP_MODES.ENTERTAINMENT }],
    vietnammusicnews: ["Vietnam Music News", "https://vietnammusicnews.com", { mode: APP_MODES.ENTERTAINMENT }],
    kworb: ["Kworb Charts", "https://kworb.net/youtube/trending/vn.html", { mode: APP_MODES.ENTERTAINMENT }],
    genius: ["Genius", "https://genius.com", { mode: APP_MODES.ENTERTAINMENT }],
    lastfm: ["Last.fm", "https://www.last.fm", { mode: APP_MODES.ENTERTAINMENT }],
    weverse: ["Weverse", "https://weverse.io", { mode: APP_MODES.ENTERTAINMENT }],
    wink: ["Wink", "https://wink.ai", { mode: APP_MODES.WORK }],
    picsart: ["Picsart", "https://picsart.com", { mode: APP_MODES.WORK }],
    camscanner: ["CamScanner", "https://www.camscanner.com", { mode: APP_MODES.WORK }],
    duolingo: ["Duolingo", "https://www.duolingo.com", { mode: APP_MODES.WORK }],
    remini: ["Remini", "https://remini.ai", { mode: APP_MODES.WORK }],
    dazz: ["Dazz Cam", "https://dazz.cam", { mode: APP_MODES.WORK }],
    b612: ["B612", "https://b612.snow.me", { mode: APP_MODES.WORK }],
    snapedit: ["SnapEdit", "https://snapedit.app", { mode: APP_MODES.WORK }],
    epik: ["EPIK", "https://epik.snow.me", { mode: APP_MODES.WORK }],

    /* ---------- Tin tức ---------- */
    vnexpress: ["VnExpress", "https://vnexpress.net", { mode: APP_MODES.ENTERTAINMENT }],
    tuoitre: ["Tuổi Trẻ", "https://tuoitre.vn", { mode: APP_MODES.ENTERTAINMENT }],
    dantri: ["Dân trí", "https://dantri.com.vn", { mode: APP_MODES.ENTERTAINMENT }],
    thanhnien: ["Thanh Niên", "https://thanhnien.vn", { mode: APP_MODES.ENTERTAINMENT }],
    kenh14: ["Kênh 14", "https://kenh14.vn", { mode: APP_MODES.ENTERTAINMENT }],
    tiin: ["Tiin", "https://tiin.vn", { mode: APP_MODES.ENTERTAINMENT }],
    yeah1: ["Yeah1", "https://yeah1.com", { mode: APP_MODES.ENTERTAINMENT }],
    genzviet: ["GenZ Việt", "https://genz.com.vn", { mode: APP_MODES.ENTERTAINMENT }],
    znews: ["Znews", "https://znews.vn", { mode: APP_MODES.ENTERTAINMENT }],
    vtv: ["VTV", "https://vtv.vn", { mode: APP_MODES.ENTERTAINMENT }],
    vietnamnet: ["VietnamNet", "https://vietnamnet.vn", { mode: APP_MODES.ENTERTAINMENT }],
    bbc: ["BBC News", "https://www.bbc.com/news", { mode: APP_MODES.ENTERTAINMENT }],
    bbcvietnamese: ["BBC Tiếng Việt", "https://www.bbc.com/vietnamese", { mode: APP_MODES.ENTERTAINMENT }],
    cnn: ["CNN", "https://edition.cnn.com", { mode: APP_MODES.ENTERTAINMENT }],
    guardian: ["The Guardian", "https://www.theguardian.com", { mode: APP_MODES.ENTERTAINMENT }],
    medium: ["Medium", "https://medium.com", { mode: APP_MODES.ENTERTAINMENT }],

    /* ---------- Mua sắm ---------- */
    shopee: ["Shopee", "https://shopee.vn", { mode: APP_MODES.SHOPPING }],
    lazada: ["Lazada", "https://www.lazada.vn", { mode: APP_MODES.SHOPPING }],
    tiki: ["Tiki", "https://tiki.vn", { mode: APP_MODES.SHOPPING }],
    amazon: ["Amazon", "https://www.amazon.com", { mode: APP_MODES.SHOPPING }],
    sendo: ["Sendo", "https://www.sendo.vn", { mode: APP_MODES.SHOPPING }],
    aliexpress: ["AliExpress", "https://www.aliexpress.com", { mode: APP_MODES.SHOPPING }],
    ebay: ["eBay", "https://www.ebay.com", { mode: APP_MODES.SHOPPING }],
    etsy: ["Etsy", "https://www.etsy.com", { mode: APP_MODES.SHOPPING }],
    temu: ["Temu", "https://www.temu.com", { mode: APP_MODES.SHOPPING }],
    taobao: ["Taobao", "https://www.taobao.com", { mode: APP_MODES.SHOPPING }],

    /* ---------- Điện tử & điện máy ---------- */
    dienmayxanh: ["Điện máy Xanh", "https://www.dienmayxanh.com", { mode: APP_MODES.SHOPPING }],
    thegioididong: ["Thế Giới Di Động", "https://www.thegioididong.com", { mode: APP_MODES.SHOPPING }],
    fptshop: ["FPT Shop", "https://fptshop.com.vn", { mode: APP_MODES.SHOPPING }],
    cellphones: ["CellphoneS", "https://cellphones.com.vn", { mode: APP_MODES.SHOPPING }],
    hoanghamobile: ["Hoàng Hà Mobile", "https://hoanghamobile.com", { mode: APP_MODES.SHOPPING }],
    nguyenkim: ["Nguyễn Kim", "https://www.nguyenkim.com", { mode: APP_MODES.SHOPPING }],
    mediamart: ["MediaMart", "https://mediamart.vn", { mode: APP_MODES.SHOPPING }],
    phongvu: ["Phong Vũ", "https://phongvu.vn", { mode: APP_MODES.SHOPPING }],
    gearvn: ["GearVN", "https://gearvn.com", { mode: APP_MODES.SHOPPING }],
    anphatpc: ["An Phát PC", "https://www.anphatpc.com.vn", { mode: APP_MODES.SHOPPING }],
    applestore: ["Apple Store", "https://www.apple.com/vn/shop", { mode: APP_MODES.SHOPPING }],
    samsungshop: ["Samsung Shop", "https://www.samsung.com/vn", { mode: APP_MODES.SHOPPING }],
    xiaomishop: ["Xiaomi Store", "https://www.mi.com/vn", { mode: APP_MODES.SHOPPING }],

    /* ---------- Thời trang, gia đình & làm đẹp ---------- */
    uniqlo: ["UNIQLO", "https://www.uniqlo.com/vn/vi/", { mode: APP_MODES.SHOPPING }],
    hm: ["H&M", "https://www2.hm.com/vi_vn/index.html", { mode: APP_MODES.SHOPPING }],
    zara: ["Zara", "https://www.zara.com/vn/", { mode: APP_MODES.SHOPPING }],
    decathlon: ["Decathlon", "https://www.decathlon.vn", { mode: APP_MODES.SHOPPING }],
    canifa: ["Canifa", "https://canifa.com", { mode: APP_MODES.SHOPPING }],
    coolmate: ["Coolmate", "https://www.coolmate.me", { mode: APP_MODES.SHOPPING }],
    ikea: ["IKEA", "https://www.ikea.com", { mode: APP_MODES.SHOPPING }],
    jysk: ["JYSK", "https://jysk.vn", { mode: APP_MODES.SHOPPING }],
    locknlock: ["LocknLock", "https://www.locknlock.vn", { mode: APP_MODES.SHOPPING }],
    hasaki: ["Hasaki", "https://hasaki.vn", { mode: APP_MODES.SHOPPING }],
    guardian: ["Guardian", "https://www.guardian.com.vn", { mode: APP_MODES.SHOPPING }],
    watsons: ["Watsons", "https://www.watsons.vn", { mode: APP_MODES.SHOPPING }],
    concung: ["Con Cưng", "https://concung.com", { mode: APP_MODES.SHOPPING }],

    /* ---------- Sức khỏe & nhà thuốc ---------- */
    longchau: ["Nhà thuốc Long Châu", "https://nhathuoclongchau.com.vn", { mode: APP_MODES.SHOPPING }],
    pharmacity: ["Pharmacity", "https://www.pharmacity.vn", { mode: APP_MODES.SHOPPING }],
    ankhang: ["Nhà thuốc An Khang", "https://www.nhathuocankhang.com", { mode: APP_MODES.SHOPPING }],

    /* ---------- Thực phẩm & đi chợ ---------- */
    bachhoaxanh: ["Bách Hóa Xanh", "https://www.bachhoaxanh.com", { mode: APP_MODES.SHOPPING }],
    winmart: ["WinMart", "https://winmart.vn", { mode: APP_MODES.SHOPPING }],
    cooponline: ["Co.op Online", "https://cooponline.vn", { mode: APP_MODES.SHOPPING }],
    aeoneshop: ["AEONESHOP", "https://aeoneshop.com", { mode: APP_MODES.SHOPPING }],
    lottemart: ["LOTTE Mart", "https://www.lottemart.vn", { mode: APP_MODES.SHOPPING }],
    grabfood: ["GrabFood", "https://www.grab.com/vn/food/", { mode: APP_MODES.SHOPPING }],
    shopeefood: ["ShopeeFood", "https://shopeefood.vn", { mode: APP_MODES.SHOPPING }],
    befood: ["beFood", "https://be.com.vn/food/", { mode: APP_MODES.SHOPPING }],

    /* ---------- Sách, du lịch & dịch vụ ---------- */
    fahasa: ["Fahasa", "https://www.fahasa.com", { mode: APP_MODES.SHOPPING }],
    vinabook: ["Vinabook", "https://www.vinabook.com", { mode: APP_MODES.SHOPPING }],
    chotot: ["Chợ Tốt", "https://www.chotot.com", { mode: APP_MODES.SHOPPING }],
    booking: ["Booking.com", "https://www.booking.com", { mode: APP_MODES.SHOPPING }],
    agoda: ["Agoda", "https://www.agoda.com", { mode: APP_MODES.SHOPPING }],
    traveloka: ["Traveloka", "https://www.traveloka.com/vi-vn", { mode: APP_MODES.SHOPPING }],
    klook: ["Klook", "https://www.klook.com/vi/", { mode: APP_MODES.SHOPPING }],
    vietnamairlines: ["Vietnam Airlines", "https://www.vietnamairlines.com", { mode: APP_MODES.SHOPPING }],
    vietjet: ["Vietjet Air", "https://www.vietjetair.com", { mode: APP_MODES.SHOPPING }],

    /* ---------- AI ---------- */
    chatgpt: ["ChatGPT", "https://chatgpt.com", { mode: APP_MODES.WORK }],
    claude: ["Claude", "https://claude.ai", { mode: APP_MODES.WORK }],
    perplexity: ["Perplexity", "https://www.perplexity.ai", { mode: APP_MODES.WORK }],
    grok: ["Grok", "https://grok.com", { mode: APP_MODES.WORK }],
    deepseek: ["DeepSeek", "https://chat.deepseek.com", { mode: APP_MODES.WORK }],
    mistral: ["Le Chat", "https://chat.mistral.ai", { mode: APP_MODES.WORK }],
    midjourney: ["Midjourney", "https://www.midjourney.com", { mode: APP_MODES.WORK }],
    huggingface: ["Hugging Face", "https://huggingface.co", { mode: APP_MODES.WORK }],
    suno: ["Suno", "https://suno.com", { mode: APP_MODES.WORK }],

    /* ---------- AI: Mỹ ---------- */
    poe: ["Poe", "https://poe.com", { mode: APP_MODES.WORK }],
    duckai: ["Duck.ai", "https://duck.ai", { mode: APP_MODES.WORK }],
    characterai: ["Character.AI", "https://character.ai", { mode: APP_MODES.WORK }],
    gamma: ["Gamma", "https://gamma.app", { mode: APP_MODES.WORK }],
    leonardo: ["Leonardo AI", "https://leonardo.ai", { mode: APP_MODES.WORK }],
    elevenlabs: ["ElevenLabs", "https://elevenlabs.io", { mode: APP_MODES.WORK }],

    /* ---------- AI: Trung Quốc ---------- */
    qwen: ["Qwen", "https://chat.qwen.ai", { mode: APP_MODES.WORK }],
    kimi: ["Kimi", "https://www.kimi.com", { mode: APP_MODES.WORK }],
    doubao: ["Doubao", "https://www.doubao.com", { mode: APP_MODES.WORK }],
    yuanbao: ["Yuanbao", "https://yuanbao.tencent.com", { mode: APP_MODES.WORK }],
    zai: ["Z.ai", "https://chat.z.ai", { mode: APP_MODES.WORK }],
    hailuo: ["Hailuo AI", "https://hailuoai.video", { mode: APP_MODES.WORK }],
    kling: ["Kling AI", "https://kling.ai", { mode: APP_MODES.WORK }],

    /* ---------- AI: Việt Nam ---------- */
    aihay: ["AI Hay", "https://ai-hay.vn", { mode: APP_MODES.WORK }],
    zaloai: ["Zalo AI", "https://ai.zalo.solutions", { mode: APP_MODES.WORK }],
    viettelai: ["Viettel AI", "https://viettelai.vn", { mode: APP_MODES.WORK }],

    /* ---------- Làm việc ---------- */
    slack: ["Slack", "https://app.slack.com", { mode: APP_MODES.WORK }],
    notion: ["Notion", "https://www.notion.so", { mode: APP_MODES.WORK }],
    trello: ["Trello", "https://trello.com", { mode: APP_MODES.WORK }],
    asana: ["Asana", "https://app.asana.com", { mode: APP_MODES.WORK }],
    jira: ["Jira", "https://www.atlassian.com/software/jira", { mode: APP_MODES.WORK }],
    figma: ["Figma", "https://www.figma.com", { mode: APP_MODES.WORK }],
    canva: ["Canva", "https://www.canva.com", { mode: APP_MODES.WORK }],
    zoom: ["Zoom", "https://app.zoom.us", { mode: APP_MODES.WORK }],
    dropbox: ["Dropbox", "https://www.dropbox.com", { mode: APP_MODES.WORK }],
    linear: ["Linear", "https://linear.app", { mode: APP_MODES.WORK }],
    miro: ["Miro", "https://miro.com", { mode: APP_MODES.WORK }],
    airtable: ["Airtable", "https://airtable.com", { mode: APP_MODES.WORK }],
    calendly: ["Calendly", "https://calendly.com", { mode: APP_MODES.WORK }],
    grammarly: ["Grammarly", "https://app.grammarly.com", { mode: APP_MODES.WORK }],

    /* ---------- Lập trình ---------- */
    github: ["GitHub", "https://github.com", { mode: APP_MODES.WORK, slug: "github", bg: "#fff" }],
    gitlab: ["GitLab", "https://gitlab.com", { mode: APP_MODES.WORK }],
    vscode: ["VS Code", "https://vscode.dev", { mode: APP_MODES.WORK }],
    codepen: ["CodePen", "https://codepen.io", { mode: APP_MODES.WORK }],
    replit: ["Replit", "https://replit.com", { mode: APP_MODES.WORK }],
    stackblitz: ["StackBlitz", "https://stackblitz.com", { mode: APP_MODES.WORK }],
    vercel: ["Vercel", "https://vercel.com", { mode: APP_MODES.WORK }],
    cloudflare: ["Cloudflare", "https://dash.cloudflare.com", { mode: APP_MODES.WORK }],
    stackoverflow: ["Stack Overflow", "https://stackoverflow.com", { mode: APP_MODES.WORK }],
    mdn: ["MDN", "https://developer.mozilla.org", { mode: APP_MODES.WORK }],
    postman: ["Postman", "https://web.postman.co", { mode: APP_MODES.WORK }],

    /* ---------- Game: trò chơi web ---------- */
    minecraft: ["Minecraft Classic", "https://classic.minecraft.net", { mode: APP_MODES.GAMES }],
    krunker: ["Krunker", "https://krunker.io", { mode: APP_MODES.GAMES }],
    slither: ["Slither.io", "https://slither.io", { mode: APP_MODES.GAMES }],
    agar: ["Agar.io", "https://agar.io", { mode: APP_MODES.GAMES }],
    shellshock: ["Shell Shockers", "https://shellshock.io", { mode: APP_MODES.GAMES }],
    skribbl: ["Skribbl", "https://skribbl.io", { mode: APP_MODES.GAMES }],
    game2048: ["2048", "https://play2048.co", { mode: APP_MODES.GAMES }],
    wordle: ["Wordle", "https://www.nytimes.com/games/wordle/index.html", { mode: APP_MODES.GAMES }],
    cookie: ["Cookie Clicker", "https://orteil.dashnet.org/cookieclicker/", { mode: APP_MODES.GAMES }],
    tetris: ["Tetris", "https://tetris.com/play-tetris", { mode: APP_MODES.GAMES }],
    alchemy: ["Little Alchemy 2", "https://littlealchemy2.com", { mode: APP_MODES.GAMES }],
    geoguessr: ["GeoGuessr", "https://www.geoguessr.com", { mode: APP_MODES.GAMES }],
    lichess: ["Lichess", "https://lichess.org", { mode: APP_MODES.GAMES }],
    chesscom: ["Chess.com", "https://www.chess.com", { mode: APP_MODES.GAMES }],
    dino: ["Chrome Dino", "https://chromedino.com", { mode: APP_MODES.GAMES }],
    geforce: ["GeForce NOW", "https://play.geforcenow.com", { mode: APP_MODES.GAMES }],

    /* ---------- Game: cổng game (nhiều trò) ---------- */
    poki: ["Poki", "https://poki.com", { mode: APP_MODES.GAMES }],
    crazygames: ["CrazyGames", "https://www.crazygames.com", { mode: APP_MODES.GAMES }],
    y8: ["Y8", "https://www.y8.com", { mode: APP_MODES.GAMES }],
    miniclip: ["Miniclip", "https://www.miniclip.com/games/en/", { mode: APP_MODES.GAMES }],
    coolmath: ["Coolmath Games", "https://www.coolmathgames.com", { mode: APP_MODES.GAMES }],
    newgrounds: ["Newgrounds", "https://www.newgrounds.com/games", { mode: APP_MODES.GAMES }],
    kongregate: ["Kongregate", "https://www.kongregate.com", { mode: APP_MODES.GAMES }],
    armorgames: ["Armor Games", "https://armorgames.com", { mode: APP_MODES.GAMES }],
    itch: ["itch.io Web", "https://itch.io/games/html5", { mode: APP_MODES.GAMES }],
    gamedistribution: ["GameDistribution", "https://gamedistribution.com", { mode: APP_MODES.GAMES }],

    /* ---------- Game: Flash (chạy bằng Ruffle) & WebGL ---------- */
    ruffle: ["Ruffle (Flash)", "https://ruffle.rs/demo/", { mode: APP_MODES.GAMES }],
    flashpoint: ["Flashpoint", "https://flashpointproject.github.io/", { mode: APP_MODES.GAMES }],
    hexgl: ["HexGL", "https://hexgl.bkcore.com/play/", { mode: APP_MODES.GAMES }],
    aquarium: ["WebGL Aquarium", "https://webglsamples.org/aquarium/aquarium.html", { mode: APP_MODES.GAMES }],
    threejs: ["Three.js", "https://threejs.org/examples/", { mode: APP_MODES.GAMES }],
    chromeexp: ["Chrome Experiments", "https://experiments.withgoogle.com", { mode: APP_MODES.GAMES }],
    voxiom: ["Voxiom", "https://voxiom.io", { mode: APP_MODES.GAMES }],
    zombs: ["ZOMBS.io", "https://zombs.io", { mode: APP_MODES.GAMES }]
  },

  folders: {
    google:    { name: "Google",     apps: ["google","gmail","drive","docs","sheets","slides","forms","calendar","meet","maps","photos","translate","keep","gchat","gemini","notebooklm","aistudio","earth","gnews","scholar","playstore","analytics","youtube","ytmusic"] },
    microsoft: { name: "Microsoft",  apps: ["m365","outlook","word","excel","powerpoint","onenote","onedrive","teams","todo","bing","copilot","azure","xboxcloud"] },
    meta:      { name: "Meta",       apps: ["facebook","fbwatch","fbmarket","fbnews","messenger","instagram","whatsapp","threads","metaai"] },
    social:    { name: "Mạng xã hội",apps: ["tiktok","x","reddit","pinterest","linkedin","snapchat","telegram","discord","zalo","tumblr","bluesky","bereal","lemon8","mastodon"] },
    media:     { name: "Giải trí",   apps: ["youtube","tiktok","netflix","spotify","twitch","disney","prime","soundcloud","zingmp3","ytmusic","bilibili","sctv","kplus","hbo","appletv","youtubekids","crunchyroll","retrocrush","pops"] },
    anime:     { name: "Anime & Manga", apps: ["crunchyroll","retrocrush","pops","tramanime","anilist","myanimelist","animenewsnetwork","mangaplus","viz","webtoon","tapas","comicwalker","bilibili"] },
    music:     { name: "Âm nhạc",    apps: ["spotify","ytmusic","zingmp3","soundcloud","nhaccuatui","applemusic","deezer","bandcamp","tidal","vietnammusicnews","kworb","genius","lastfm","weverse","pops"] },
    youth:     { name: "Giới trẻ",   apps: ["kenh14","tiin","yeah1","genzviet","weverse","tiktok","instagram","lemon8","bereal","locket"] },
    popularvn: { name: "Yêu thích VN", apps: ["tiktok","zalo","youtube","capcut","chatgpt","claude","gemini","gmail","canva","meitu","locket","weplay","tinder","vieon","fptplay","tv360","vtvgo","hypic","bandlab","zingmp3","wink","zoom","picsart","discord","camscanner","duolingo","remini","dazz","b612","snapedit","epik"] },
    news:      { name: "Tin tức",    apps: ["fbnews","vnexpress","tuoitre","dantri","thanhnien","kenh14","tiin","znews","vtv","vietnamnet","gnews","bbc","bbcvietnamese","cnn","guardian","medium"] },
    shopping:  { name: "Mua sắm",    apps: ["shopee","lazada","tiki","amazon","fbmarket","sendo","aliexpress","ebay","etsy","temu","taobao","dienmayxanh","thegioididong","fptshop","cellphones","hoanghamobile","nguyenkim","mediamart","phongvu","gearvn","anphatpc","applestore","samsungshop","xiaomishop","uniqlo","hm","zara","decathlon","canifa","coolmate","ikea","jysk","locknlock","hasaki","guardian","watsons","concung","longchau","pharmacity","ankhang","bachhoaxanh","winmart","cooponline","aeoneshop","lottemart","grabfood","shopeefood","befood","fahasa","vinabook","chotot","booking","agoda","traveloka","klook","vietnamairlines","vietjet"] },
    ai:        { name: "AI",         apps: ["chatgpt","claude","gemini","copilot","perplexity","grok","deepseek","metaai","mistral","midjourney","huggingface","notebooklm","aistudio","suno","poe","duckai","characterai","gamma","leonardo","elevenlabs","qwen","kimi","doubao","yuanbao","zai","hailuo","kling","aihay","zaloai","viettelai"] },
    work:      { name: "Làm việc",   apps: ["slack","notion","trello","asana","jira","figma","canva","zoom","teams","dropbox","linear","miro","airtable","calendly","grammarly"] },
    dev:       { name: "Lập trình",  apps: ["github","gitlab","vscode","codepen","replit","stackblitz","vercel","cloudflare","stackoverflow","mdn","postman","huggingface"] },
    games:     { name: "Game Web",   apps: ["minecraft","krunker","slither","agar","shellshock","skribbl","game2048","wordle","cookie","tetris","alchemy","geoguessr","lichess","chesscom","dino","geforce","xboxcloud"] },
    portals:   { name: "Cổng game",  apps: ["poki","crazygames","y8","miniclip","coolmath","newgrounds","kongregate","armorgames","itch","gamedistribution"] },
    flashwebgl:{ name: "Flash & WebGL", apps: ["ruffle","flashpoint","newgrounds","hexgl","aquarium","threejs","chromeexp","voxiom","zombs","earth"] }
  },

  layout: {
    dock: ["app:google", "app:gmail", "app:youtube", "app:chatgpt"],
    pages: [
      ["folder:popularvn","folder:google","folder:microsoft","folder:meta","folder:work",
       "app:youtube","app:tiktok","app:instagram","app:facebook",
       "app:chatgpt","app:gemini","app:claude","app:github",
       "app:slack","app:notion","app:whatsapp","app:spotify"],
      ["folder:social","folder:media","folder:anime","folder:music","folder:youth","folder:news","folder:shopping",
       "folder:ai","folder:dev","app:netflix","app:zalo",
       "app:messenger","app:threads","app:x","app:reddit",
       "app:vnexpress","app:shopee","app:zoom","app:figma"],
      ["folder:games","folder:portals","folder:flashwebgl","app:minecraft",
       "app:poki","app:crazygames","app:krunker","app:slither",
       "app:agar","app:wordle","app:game2048","app:ruffle"]
    ]
  }
};
