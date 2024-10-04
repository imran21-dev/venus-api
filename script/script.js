const btnNav = document.getElementById('btnNav');
const videosContainer = document.getElementById('main');

// button fetch---------------
const categoriesBtn = async() => {
    const res =await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
    const data = await res.json();
     displayCategoriesBtn(data.categories)
     

}
categoriesBtn();

// category fetch ----------------------
const allBtn = document.getElementById("allBtn");

const loadCategories = async(id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    const data = await res.json()
    displayVideos(data.category)
    
    const categoriesBtn = document.getElementsByClassName('categoriesBtn');
     for (const btn of categoriesBtn) {
          btn.classList.remove("bg-[#FF3EFF]/20")
      
     }
        allBtn.classList.remove("bg-[#FF3EFF]/20")

    const activBtn = document.getElementById(id);
    activBtn.classList.add("bg-[#FF3EFF]/20")


 
}

const displayCategoriesBtn = (btnArray) => {
    const makeBtn = btnArray.map((btn) => {
           const categoriesBtnContainer = document.createElement("div");
                 categoriesBtnContainer.innerHTML = `
                 <button id="${btn.category_id}" onclick="loadCategories(${btn.category_id})" class="categoriesBtn btn text-xs md:text-base flex items-center px-3 md:px-7 py-1 md:py-2 rounded-full min-h-0 h-max hover:bg-[#FF3EFF]/20 hover:border-[#FF3EFF]">${btn.category}</button>
                 `
            btnNav.appendChild(categoriesBtnContainer)
       
    })
}
// video fetch----------------------------




const searchInput = document.getElementById("searchInput");
     searchInput.addEventListener('keyup', (event) => {
        const keywords = event.target.value;
         loadVideos(keywords)
      
     })

const loadVideos = async(keywords = '') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${keywords}`);
    const data = await res.json();
    displayVideos(data.videos)
    const categoriesBtn = document.getElementsByClassName('categoriesBtn');
    for (const btn of categoriesBtn) {
         btn.classList.remove("bg-[#FF3EFF]/20")
     
    }

   allBtn.classList.add("bg-[#FF3EFF]/20")
}
loadVideos();

document.getElementById("allBtn").addEventListener('click', () => {
    loadVideos()

    const categoriesBtn = document.getElementsByClassName('categoriesBtn');
     for (const btn of categoriesBtn) {
          btn.classList.remove("bg-[#FF3EFF]/20")
      
     }

    allBtn.classList.add("bg-[#FF3EFF]/20")

})

// details function----------------------
const modalSection = document.getElementById('modalSection');
const modalDiv = document.createElement("div");

const loadDetails = async(detail) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${detail}`);
    const data = await res.json();
    const detailText =await data.video.description;
    const detailImg =await data.video.thumbnail;

      modalDiv.innerHTML = `
       <dialog id="my_modal_2" class="modal">
     <div class="modal-box p-1 md:p-6">
       <img class="w-full md:h-64 h-48 object-cover  rounded-xl" src="${detailImg}" />
       <p class="py-4 px-3 md:px-0 text-sm md:text-base">${detailText}</p>
     </div>
     <form method="dialog" class="modal-backdrop">
       <button>close</button>
     </form>
     </dialog>
      `
      modalSection.appendChild(modalDiv)

    my_modal_2.showModal()
}


const displayVideos = (videosArray) => {
    videosContainer.innerHTML = ""
    if (videosArray.length < 1) {
        videosContainer.classList = "flex justify-center"
        videosContainer.classList.remove("grid")
        videosContainer.innerHTML = `
           <div class="text-center">
            <svg class="md:w-[400px] md:h-[523px] w-60 h-64"
             xmlns="http://www.w3.org/2000/svg" width="400" height="523" viewBox="0 0 611.492 523.95294" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M84.10482,513.25159c-1.21703,.07623-1.88965-1.43585-.96888-2.31714l.09161-.3642-.0364-.0874c-1.23077-2.93475-5.40199-2.91449-6.6223,.0246-1.08311,2.60864-2.46209,5.22174-2.80163,7.97992-.15221,1.21753-.08373,2.45795,.18644,3.65271-2.53788-5.54376-3.87342-11.59735-3.87342-17.68524,0-1.5296,.08373-3.0592,.25493-4.58496,.14079-1.24805,.33484-2.4884,.58598-3.71741,1.35831-6.6434,4.29955-12.97095,8.54201-18.25598,2.03944-1.11487,3.74023-2.85751,4.76755-4.94638,.36907-.75339,.65825-1.56384,.79523-2.3895-.23209,.03043-.87515-3.50436-.70009-3.72122-.32345-.49081-.90237-.7348-1.25563-1.21375-1.75688-2.38196-4.17742-1.96606-5.44104,1.27084-2.69939,1.36237-2.72552,3.62183-1.06919,5.79486,1.05377,1.38251,1.19856,3.2532,2.12316,4.73328-.09514,.12177-.19407,.23975-.28919,.36151-1.74436,2.23734-3.25305,4.64212-4.52489,7.16849,.35945-2.80777-.17123-6.19037-1.07594-8.37085-1.02986-2.48441-2.96017-4.57681-4.66004-6.72458-2.04182-2.5798-6.22877-1.45392-6.58849,1.81638l-.0102,.09497c.25249,.14243,.49984,.29376,.74146,.45355,1.37819,.91147,.90189,3.04791-.73112,3.29999l-.03698,.00571c.09133,.90939,.24733,1.81116,.4756,2.69772-2.18072,8.43344,2.5273,11.50504,9.24972,11.64304,.1484,.07608,.29301,.15219,.44141,.22452-.6811,1.91766-1.22522,3.8848-1.62851,5.87857-.36146,1.76166-.61261,3.54236-.75337,5.33069-.17505,2.25629-.15982,4.52405,.03045,6.77655l-.01142-.0799c-.48321-2.48077-1.83016-4.79797-3.7859-6.40369-2.91346-2.39331-7.02962-3.2746-10.17272-5.19836-1.513-.92603-3.4518,.27066-3.18774,2.02478l.01285,.08398c.468,.19019,.92458,.41095,1.36595,.6582,.25249,.14246,.49984,.29376,.74146,.45355,1.37819,.9115,.90189,3.04797-.73112,3.30005l-.03701,.00568-.07606,.01147c.80284,1.90619,1.92145,3.67554,3.32166,5.20129,1.36355,7.36206,7.22002,8.06055,13.48461,5.91663h.00382c.68488,2.98309,1.68558,5.89764,2.97165,8.67523h10.61568c.03808-.11792,.07231-.23975,.10656-.35767-.98167,.06091-1.97095,.00378-2.93742-.17499,.78763-.96649,1.57523-1.94055,2.36286-2.90698,.01902-.01904,.03427-.03809,.04947-.05707,.39951-.49463,.80284-.98547,1.20234-1.4801l.00022-.00061c.02501-1.51843-.15701-3.03186-.51767-4.50061l-.00033-.00018-.00002-.00006,.00006,.00006Z" fill="#f2f2f2"/><path d="M535.94708,513.25159c1.21704,.07623,1.88965-1.43585,.96887-2.31714l-.09161-.3642,.03638-.0874c1.23077-2.93475,5.40198-2.91449,6.62231,.0246,1.08313,2.60864,2.4621,5.22174,2.80164,7.97992,.15222,1.21753,.08374,2.45795-.18646,3.65271,2.5379-5.54376,3.87341-11.59735,3.87341-17.68524,0-1.5296-.08374-3.0592-.25494-4.58496-.14081-1.24805-.33484-2.4884-.586-3.71741-1.35834-6.6434-4.29956-12.97095-8.54199-18.25598-2.03943-1.11487-3.74023-2.85751-4.76758-4.94638-.36908-.75339-.65826-1.56384-.79523-2.3895,.23212,.03043,.87512-3.50436,.70007-3.72122,.32343-.49081,.90234-.7348,1.25562-1.21375,1.7569-2.38196,4.17743-1.96606,5.44104,1.27084,2.6994,1.36237,2.72552,3.62183,1.06921,5.79486-1.05377,1.38251-1.19855,3.2532-2.12317,4.73328,.09515,.12177,.19409,.23975,.28918,.36151,1.74438,2.23734,3.25305,4.64212,4.5249,7.16849-.35944-2.80777,.1712-6.19037,1.07593-8.37085,1.02985-2.48441,2.96014-4.57681,4.66003-6.72458,2.04181-2.5798,6.22876-1.45392,6.5885,1.81638l.01019,.09497c-.2525,.14243-.49982,.29376-.74146,.45355-1.37817,.91147-.90192,3.04791,.73114,3.29999l.03699,.00571c-.09131,.90939-.24731,1.81116-.47559,2.69772,2.18073,8.43344-2.52728,11.50504-9.24969,11.64304-.14838,.07608-.29303,.15219-.44141,.22452,.68109,1.91766,1.22522,3.8848,1.62854,5.87857,.36145,1.76166,.61261,3.54236,.75336,5.33069,.17505,2.25629,.15979,4.52405-.03046,6.77655l.01141-.0799c.48322-2.48077,1.83014-4.79797,3.78589-6.40369,2.91345-2.39331,7.0296-3.2746,10.17273-5.19836,1.513-.92603,3.45178,.27066,3.18774,2.02478l-.01288,.08398c-.46802,.19019-.92456,.41095-1.36597,.6582-.2525,.14246-.49982,.29376-.74146,.45355-1.37817,.9115-.90192,3.04797,.73114,3.30005l.03699,.00568,.07605,.01147c-.80286,1.90619-1.92145,3.67554-3.32166,5.20129-1.36353,7.36206-7.22003,8.06055-13.48462,5.91663h-.00385c-.68488,2.98309-1.68561,5.89764-2.97168,8.67523h-10.61566c-.03809-.11792-.07233-.23975-.10657-.35767,.98169,.06091,1.97095,.00378,2.93744-.17499-.78766-.96649-1.57526-1.94055-2.36285-2.90698-.01904-.01904-.03424-.03809-.0495-.05707-.39954-.49463-.80286-.98547-1.20233-1.4801l-.00024-.00061c-.02502-1.51843,.15698-3.03186,.5177-4.50061l.00031-.00018v-.00006l.00012,.00006Z" fill="#f2f2f2"/><g><polygon points="330.42502 517.7486 339.53735 517.74774 343.87213 482.59982 330.42316 482.60071 330.42502 517.7486" fill="#ffb6b6"/><path d="M361.64496,517.54187h0c.28372,.47784,.43344,2.02008,.43344,2.57581h0c0,1.70807-1.38467,3.09271-3.09274,3.09271h-28.21979c-1.16525,0-2.10986-.94464-2.10986-2.10986v-1.17487s-1.39603-3.53113,1.47815-7.88342c0,0,3.57217,3.40796,8.90991-1.92981l1.57404-2.8515,11.39395,8.33295,6.31549,.7774c1.38168,.17004,2.60669-.02643,3.31744,1.17059h-.00003Z" fill="#2f2e41"/></g><g><polygon points="267.49289 517.7486 276.60522 517.74774 280.94 482.59982 267.49106 482.60071 267.49289 517.7486" fill="#ffb6b6"/><path d="M298.71286,517.54187h0c.28372,.47784,.43344,2.02008,.43344,2.57581h0c0,1.70807-1.38467,3.09271-3.09274,3.09271h-28.21979c-1.16525,0-2.10986-.94464-2.10986-2.10986v-1.17487s-1.39603-3.53113,1.47815-7.88342c0,0,3.57217,3.40796,8.90991-1.92981l1.57404-2.8515,11.39395,8.33295,6.31549,.7774c1.38168,.17004,2.60669-.02643,3.31744,1.17059h-.00003Z" fill="#2f2e41"/></g><path id="b-887" d="M1.01849,523.95294H610.47351c.5625,0,1.01849-.45599,1.01849-1.01849s-.45599-1.01849-1.01849-1.01849H1.01849c-.5625,0-1.01849,.45599-1.01849,1.01849s.45599,1.01849,1.01849,1.01849Z" fill="#e6e6e6"/><path id="c-888" d="M333.14899,351.75031l3.37701,4.44199s.30603,2.07401,5.42798,18.974l2.81,127.022h-17l-22.71899-101.63297-23.58197,103.67099-14.73499,.86902,.69098-117.83301s-1.55164-4.10043-.23172-8.90567c5.05173-18.39136,4.76044-13.54257,4.96774-19.83832,.26285-7.98248,60.99396-6.76804,60.99396-6.76804Z" fill="#2f2e41"/><circle id="d" cx="306.35303" cy="227.17233" r="17.83701" fill="#feb8b8"/><path id="e-889" d="M296.763,248.36534l-9.87,5.45499c-8.23471,.59613-14.14044,2.78716-19.388,5.429l5.78699,50.73801-1.05298,49.978s32.81897,22.483,64.289-3.77399v-67.90799l-1.47748-27.00558c-.17227-3.14886-2.95694-5.59183-6.08325-5.1781-1.78543,.23627-3.84134,.19052-5.94135-.50946l-6.53244-7.58087-19.7305,.35605v-.00005Z" fill="#6c63ff"/><g><path d="M352.56717,206.50858c.9953,2.24483,1.40112,4.52834,1.2692,6.5079l10.83261,20.78603-10.0416,4.86523-9.90741-21.60919c-1.5556-1.23135-2.97543-3.06525-3.97079-5.31007-2.27383-5.1283-1.47156-10.45859,1.7919-11.90555s7.75229,1.53731,10.02609,6.6656h0v.00005Z" fill="#ffb6b6"/><path id="f-890" d="M323.02594,255.59019l2.9881,1.36662c2.74161-2.94711,11.00027-2.48346,15.00726-2.10141l17.60876,1.67896-8.22284-25.72507,12.37921-4.98164,14.79181,28.46748c.89471,4.82928-1.11264,9.73624-5.13553,12.55383l-37.73965,21.43237-4.38699-29.35699-7.29013-3.33414v-.00002Z" fill="#6c63ff"/></g><g><path d="M231.76274,376.25491c.18797-2.44839,.91338-4.65131,1.96808-6.33173l.31755-23.43723,11.14793,.47736-1.52243,23.72333c.78584,1.82172,1.16643,4.10956,.97845,6.55792-.42944,5.59332-3.66306,9.90604-7.22243,9.63275s-6.09666-5.02911-5.66722-10.62241h0l.00005-.00003,.00002,.00003Z" fill="#ffb6b6"/><path id="g-891" d="M275.76624,265.66034l-5.12277-7.78119s-8.35495,1.5947-12.79431,7.89429-21.21986,44.9339-21.21986,44.9339l-3.22243,43.61346,12.48148-2.5705,6.02232-33.07611,19.36482-26.46204,4.49078-26.55185-.00003,.00003Z" fill="#6c63ff"/></g><path d="M324.19003,229.53821c.66998-3.40002-9.66864-8.34892-9.65048-8.34312,1.60486,.51225-.91922,3.45261-2.56784,3.106,0,0-2.4223,1.23222-1.10233,2.29222-4.54999-.39001-10.62939-4.71402-15.17938-5.10403-1.83002-.15997-2.53888,4.25305-3.6889,5.68304-1.73999,2.19-3.48508-2.16534-2.84113,3.63696h-.25995c-.95001-2.28998-1.90002-4.62-2.21002-7.07996-.29999-2.46002,.12-5.11005,1.69-7.03003,.52002-.65002-1.52298-2.78984-.97293-3.40984,1.75-2.01001,5.14294-3.11018,6.70291-5.26015,2.06491-2.84814,4.41437-.83783,8.71402-3.23312,1.12491-.62668,3.08011-.85223,4.32602-.52686l2.90997,.75996h0c-.56729,.85094,.13467,1.97322,1.14807,1.83546l3.79196-.51546c1.42999,.45996,2.78998,1.13995,3.42999,2.44995,.39001,.78003,.46002,1.69,.76001,2.51001,.54999,1.51001,1.84998,2.60004,2.89001,3.82001,2.79578,.81416,2.94589,2.90413,2.94589,6.40886,2.6055,1.46161-.11319,4.72974-.83591,8.00006v.00002Z" fill="#2f2e41"/><g><path d="M32.3056,64.66941h0c.8119-2.27975,3.07606-3.62541,5.38132-3.36691,.96071,.10773,1.92058,.19329,2.88564,.13653,24.06981-1.41557,53.88227,12.36618,85.61883,31.23966h0c-29.05291-23.50843-55.64321-44.30417-86.9171-22.93323-2.23384,1.52649-5.39877,.98734-6.69819-1.38578-.52203-.95338-.71058-2.09595-.39927-3.27443,.03673-.13906,.07961-.27777,.12878-.41583h-.00001v-.00002Z" fill="#e6e6e6"/><path d="M192.83894,8.28241h0c1.98395,1.26489,2.80037,3.67046,2.13899,5.81492l-.07458,.24196c-.66281,2.15276-2.10623,3.96141-4.01843,5.15185-27.36899,17.03845,4.31863,38.84358-46.33417,74.03983v-.00002c24.52843-26.24679,44.70352-87.02903,47.76846-85.53939,.17654,.0858,.35004,.18269,.51971,.29086h.00002Z" fill="#e6e6e6"/><path d="M234.78984,141.51893h0c-1.02045,2.12007-3.3121,3.21626-5.5199,2.81412l-.2491-.04534c-2.21622-.40259-4.18342-1.62111-5.59243-3.37848-20.16676-25.15297-38.05631,8.89894-79.01635-37.21784h.00002c28.97281,21.23944,91.72015,34.05687,90.60486,37.27697-.06424,.18548-.13985,.36925-.22711,.55057v.00002h.00001Z" fill="#e6e6e6"/><path d="M197.92944,139.94728h0c-1.05028,.58294-2.74425,.50117-4.11177-.13104l-.1543-.07132c-1.37293-.63419-2.4354-1.52396-3.03596-2.49697-8.59565-13.92656-26.44331-4.88932-44.80315-31.28868h.00002c15.05083,14.35417,53.66487,32.84857,52.3532,33.82838-.07555,.05644-.15821,.10976-.24803,.15961h0Z" fill="#e6e6e6"/><path d="M206.21237,84.39839h0c-.25973,1.1728-1.44383,2.38694-2.82366,2.99179l-.15568,.06826c-1.38491,.60758-2.75539,.8133-3.88201,.61799-16.12511-2.79552-21.18917,16.55818-53.12549,12.8057h.00001c20.72419-1.75428,60.16756-18.40683,60.03172-16.77525-.00782,.09398-.02269,.19121-.0449,.29151h.00001Z" fill="#e6e6e6"/><path d="M44.832,157.14403h0c-1.15762-2.04839-.74881-4.55562,.84212-6.13837l.17947-.1786c1.59609-1.5894,3.71979-2.50841,5.96707-2.66148,32.16473-2.1909,14.42759-36.32243,75.67593-43.61082v.00002c-33.98098,11.65469-80.33583,55.84454-82.34232,53.0901-.11557-.15865-.22326-.32567-.32227-.50085v.00002Z" fill="#e6e6e6"/><path d="M174.18474,156.77613h0c-1.18976,.79375-2.71685,.63552-3.73258-.28915l-.11462-.10431c-1.01993-.92761-1.65625-2.20705-1.8357-3.59191-2.5684-19.82104-22.4531-7.55536-29.22231-45.18098h.00001c8.34316,20.58733,36.77697,47.60228,35.19457,48.948-.09114,.07751-.18764,.15046-.28939,.21835h0Z" fill="#e6e6e6"/><path d="M138.16052,189.37718h0c-1.82246,.01503-3.35651-1.21017-3.81633-2.89148l-.05191-.18969c-.46234-1.68734-.27146-3.48091,.48286-5.06945,10.79637-22.73624-18.97849-23.54284-.52065-68.01415h.00002c-5.1102,27.54695,6.98887,75.80775,4.36657,76.13438-.15104,.01882-.30471,.0291-.46058,.03039h.00001Z" fill="#6c63ff"/><path d="M72.19544,158.30576h0c-1.17417-1.39388-1.20926-3.35683-.20782-4.7835l.11296-.16098c1.00448-1.43244,2.50747-2.42962,4.21199-2.86209,24.3964-6.18983,6.02335-29.6339,52.04531-43.78906v.00002c-24.47373,13.63761-53.92086,53.74196-55.84523,51.93091-.11084-.10431-.21679-.21609-.31722-.3353h0Z" fill="#6c63ff"/><path d="M86.99768,137.95189h0c-.7426-.69377-.76259-1.73762-.12623-2.53869l.07178-.09039c.63828-.80427,1.59203-1.39734,2.67286-1.69802,15.46965-4.30353,3.8516-16.02912,33.03677-25.46724h0c-15.5272,8.27276-34.23691,30.84473-35.45451,29.95978-.07013-.05097-.13716-.10612-.20067-.16545h0Z" fill="#6c63ff"/><path d="M108.63188,152.78505h0c-.93904-.38855-1.32459-1.3588-1.01034-2.3324l.03544-.10985c.31493-.97728,.99942-1.86769,1.90565-2.52903,12.97055-9.46548-2.02713-16.36026,21.97966-35.45282h0c-11.62954,13.20176-21.21347,40.90907-22.6644,40.50847-.08357-.02307-.1657-.05115-.24601-.08438h0Z" fill="#e6e6e6"/><polygon points="45.34017 87.02386 47.69936 94.28473 55.33389 94.28473 49.15743 98.77219 51.51663 106.03306 45.34017 101.5456 39.1637 106.03306 41.5229 98.77219 35.34644 94.28473 42.98097 94.28473 45.34017 87.02386" fill="#6c63ff"/><polygon points="150.54813 0 152.9073 7.26087 160.54184 7.26087 154.36539 11.74833 156.72458 19.0092 150.54813 14.52173 144.37164 19.0092 146.73085 11.74833 140.5544 7.26087 148.18892 7.26087 150.54813 0" fill="#e6e6e6"/><polygon points="206.39925 77.93181 208.75845 85.19268 216.39297 85.19268 210.21651 89.68015 212.57571 96.94101 206.39925 92.45355 200.22279 96.94101 202.58199 89.68015 196.40552 85.19268 204.04005 85.19268 206.39925 77.93181" fill="#6c63ff"/><polygon points="93.39812 157.16249 95.75732 164.42336 103.39185 164.42336 97.21538 168.91081 99.57458 176.17169 93.39812 171.68423 87.22165 176.17169 89.58085 168.91081 83.40439 164.42336 91.03892 164.42336 93.39812 157.16249" fill="#6c63ff"/><polygon points="136.26062 77.93181 138.61983 85.19268 146.25433 85.19268 140.07788 89.68015 142.43707 96.94101 136.26062 92.45355 130.08415 96.94101 132.44334 89.68015 126.26689 85.19268 133.90141 85.19268 136.26062 77.93181" fill="#6c63ff"/><polygon points="195.20354 0 197.56274 7.26087 205.19727 7.26087 199.0208 11.74833 201.38 19.0092 195.20354 14.52174 189.02708 19.0092 191.38628 11.74833 185.20982 7.26087 192.84435 7.26087 195.20354 0" fill="#e6e6e6"/><polygon points="41.33871 143.50191 44.33053 150.5258 51.93516 149.85091 46.17957 154.86681 49.17139 161.8907 42.62242 157.96681 36.86682 162.9827 38.57493 155.5417 32.02596 151.61778 39.6306 150.9429 41.33871 143.50191" fill="#e6e6e6"/><path d="M106.64972,9.35388h0c1.3771-.67797,2.92477-.22063,3.80109,1.00777l.09889,.13858c.88012,1.23249,1.29832,2.79173,1.22495,4.38643-1.05014,22.82458,21.77875,12.62182,21.74117,56.29478h-.00001c-4.77104-24.74344-29.0915-60.40532-27.20576-61.63414,.10861-.07078,.2219-.13543,.33968-.19342h0Z" fill="#6c63ff"/><path d="M86.74068,43.18536h0c.61043-.76213,1.61209-.86721,2.43019-.32925l.09231,.06068c.82133,.53953,1.46361,1.39592,1.83454,2.39706,5.3089,14.32913,15.69659,2.33369,26.98005,29.25833h0c-9.12782-14.05632-32.239-29.95392-31.48087-31.1827,.04367-.07077,.09159-.13895,.14379-.20413h0Z" fill="#e6e6e6"/><path d="M69.1683,84.83546h0c.08366-.97286,.85781-1.61711,1.83691-1.62481l.11046-.00089c.98265-.00819,1.99265,.34654,2.85758,.97247,12.37943,8.95868,14.34443-6.78722,38.69274,9.31907h0c-15.40203-6.60867-43.45069-6.97336-43.50371-8.41622-.00305-.0831-.00113-.16641,.00603-.24962h0Z" fill="#e6e6e6"/></g><g><path d="M414.87776,124.76317h0c.52825-1.48329,2.0014-2.35883,3.50129-2.19064,.62507,.07009,1.2496,.12576,1.87751,.08883,15.66074-.92102,35.05787,8.04591,55.70688,20.32572h0c-18.90293-15.29548-36.2036-28.82598-56.55158-14.92123-1.45342,.99319-3.51265,.6424-4.3581-.90164-.33965-.6203-.46233-1.3637-.25978-2.13047,.0239-.09048,.0518-.18073,.08379-.27056h0Z" fill="#e6e6e6"/><path d="M519.32689,88.07563h0c1.29083,.82299,1.82203,2.38814,1.39171,3.78341l-.04853,.15743c-.43125,1.40067-1.37039,2.57744-2.61455,3.35199-17.80731,11.08587,2.80987,25.27311-30.14678,48.17314h0c15.95913-17.07718,29.08582-56.62443,31.07999-55.65521,.11487,.05582,.22775,.11886,.33815,.18924h0Z" fill="#e6e6e6"/><path d="M546.62174,174.7644h0c-.66394,1.3794-2.15498,2.09262-3.59146,1.83097l-.16208-.0295c-1.44196-.26194-2.72189-1.05476-3.63865-2.19817-13.12126-16.36549-24.76089,5.78999-51.41106-24.21535h.00001c18.85082,13.81919,59.67663,22.1587,58.95098,24.25382-.0418,.12068-.09099,.24025-.14777,.35822h0Z" fill="#e6e6e6"/><path d="M522.63896,173.74182h0c-.68336,.37928-1.78552,.32608-2.67528-.08526l-.10039-.0464c-.89328-.41263-1.58457-.99155-1.97531-1.62463-5.59266-9.06115-17.20503-3.18118-29.15064-20.35761h0c9.79264,9.33937,34.91641,21.37253,34.06299,22.01004-.04916,.03672-.10294,.07141-.16138,.10385h0Z" fill="#e6e6e6"/><path d="M528.02815,137.59959h0c-.16899,.76307-.93941,1.55303-1.83718,1.94657l-.10129,.04441c-.90108,.39531-1.79276,.52917-2.52579,.40209-10.49161-1.81887-13.78648,10.77338-34.56547,8.33188h0c13.48395-1.1414,39.14731-11.97619,39.05893-10.91462-.00509,.06115-.01476,.12441-.02921,.18967h0Z" fill="#e6e6e6"/><path d="M423.02792,184.93068h0c-.75319-1.33276-.4872-2.96406,.54792-3.99386l.11677-.11621c1.03848-1.03413,2.42024-1.63207,3.8824-1.73166,20.9276-1.42548,9.38714-23.63276,49.23765-28.37487h0c-22.10932,7.583-52.26956,36.3346-53.57506,34.54246-.07519-.10322-.14526-.21189-.20968-.32588h0Z" fill="#e6e6e6"/><path d="M507.18975,184.69132h0c-.7741,.51644-1.76769,.41349-2.42856-.18813l-.07457-.06787c-.66361-.60354-1.07762-1.43599-1.19438-2.33703-1.6711-12.89633-14.60884-4.91581-19.01315-29.39647h0c5.42838,13.3949,23.9285,30.97186,22.89893,31.84744-.0593,.05043-.12208,.0979-.18829,.14207h0Z" fill="#e6e6e6"/><path d="M483.75102,205.90281h0c-1.18576,.00978-2.18387-.78738-2.48305-1.88131l-.03377-.12342c-.30081-1.09785-.17662-2.26482,.31417-3.29838,7.02453-14.79307-12.34813-15.31787-.33875-44.25261h.00001c-3.32489,17.9231,4.54722,49.32342,2.84106,49.53594-.09827,.01224-.19826,.01893-.29967,.01977h0Z" fill="#6c63ff"/><path d="M440.83161,185.68655h0c-.76396-.90691-.78679-2.18408-.13521-3.11232l.0735-.10474c.65355-.932,1.63145-1.5808,2.74048-1.86219,15.87323-4.02734,3.91902-19.28094,33.86266-28.49084h0c-15.92355,8.87316-35.08297,34.96658-36.33504,33.78824-.07212-.06787-.14105-.1406-.20639-.21816h0Z" fill="#6c63ff"/><path d="M450.46252,172.44355h0c-.48316-.4514-.49617-1.13056-.08213-1.65177l.0467-.05881c.41529-.52329,1.03584-.90916,1.73907-1.1048,10.06514-2.80004,2.506-10.42915,21.49498-16.56996h0c-10.10259,5.38257-22.27584,20.06876-23.06806,19.49298-.04563-.03316-.08924-.06905-.13056-.10765h0Z" fill="#6c63ff"/><path d="M464.53855,182.09457h0c-.61098-.25281-.86183-.88408-.65737-1.51755l.02306-.07147c.20491-.63586,.65026-1.21519,1.23989-1.64548,8.43913-6.1586-1.31893-10.64461,14.30081-23.06696h0c-7.56662,8.58957-13.80229,26.61701-14.74632,26.35636-.05437-.01501-.10781-.03328-.16007-.0549h0Z" fill="#e6e6e6"/><polygon points="423.35855 139.30782 424.89353 144.03202 429.86085 144.03202 425.84221 146.95174 427.37719 151.67594 423.35855 148.75622 419.3399 151.67594 420.87489 146.95174 416.85625 144.03202 421.82357 144.03202 423.35855 139.30782" fill="#6c63ff"/><polygon points="491.81087 82.68678 493.34584 87.41098 498.31316 87.41098 494.29452 90.33069 495.8295 95.05489 491.81087 92.13517 487.79221 95.05489 489.3272 90.33069 485.30856 87.41098 490.27588 87.41098 491.81087 82.68678" fill="#e6e6e6"/><polygon points="528.14974 133.39219 529.68473 138.11639 534.65204 138.11639 530.63339 141.03611 532.16838 145.7603 528.14974 142.84059 524.1311 145.7603 525.66608 141.03611 521.64744 138.11639 526.61476 138.11639 528.14974 133.39219" fill="#6c63ff"/><polygon points="454.62689 184.9427 456.16187 189.66689 461.12919 189.66689 457.11054 192.5866 458.64553 197.31081 454.62689 194.3911 450.60824 197.31081 452.14323 192.5866 448.12459 189.66689 453.0919 189.66689 454.62689 184.9427" fill="#6c63ff"/><polygon points="482.51487 133.39219 484.04986 138.11639 489.01716 138.11639 484.99852 141.03611 486.5335 145.7603 482.51487 142.84059 478.49622 145.7603 480.0312 141.03611 476.01257 138.11639 480.97988 138.11639 482.51487 133.39219" fill="#6c63ff"/><polygon points="520.86538 82.68678 522.40037 87.41098 527.36768 87.41098 523.34904 90.33069 524.88403 95.05489 520.86538 92.13518 516.84675 95.05489 518.38173 90.33069 514.36309 87.41098 519.3304 87.41098 520.86538 82.68678" fill="#e6e6e6"/><polygon points="420.75505 176.0546 422.70164 180.62461 427.64951 180.1855 423.9047 183.44904 425.85129 188.01905 421.59028 185.46602 417.84547 188.72955 418.95683 183.88815 414.69582 181.3351 419.64369 180.89599 420.75505 176.0546" fill="#e6e6e6"/><path d="M463.24889,88.77277h0c.89599-.44112,1.90297-.14355,2.47314,.65569l.06434,.09016c.57264,.8019,.84473,1.81641,.797,2.85398-.68326,14.85054,14.17008,8.21224,14.14563,36.62753h0c-3.10422-16.09903-18.92804-39.302-17.7011-40.10152,.07067-.04605,.14438-.08812,.22101-.12585h0Z" fill="#6c63ff"/><path d="M450.2953,110.78482h0c.39717-.49587,1.04889-.56424,1.58118-.21422l.06006,.03948c.53439,.35104,.95228,.90824,1.19362,1.55962,3.45417,9.32308,10.2128,1.51839,17.55425,19.03659h0c-5.93891-9.14558-20.97592-19.48916-20.48265-20.28865,.02841-.04605,.05959-.0904,.09356-.13281h0Z" fill="#e6e6e6"/><path d="M438.86204,137.88397h0c.05443-.63298,.55812-1.05215,1.19516-1.05716l.07187-.00058c.63935-.00533,1.2965,.22547,1.85925,.63272,8.05453,5.82886,9.33304-4.41603,25.17498,6.06334h0c-10.02115-4.29986-28.27068-4.53714-28.30518-5.47592-.00199-.05407-.00073-.10827,.00392-.16241h0Z" fill="#e6e6e6"/></g>
            </svg>
        <h3 class="font-bold text-sm md:text-lg">Opps! There is no content here</h3>
           </div>
        `
    }
    else{

        videosContainer.classList = "md:px-5  py-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-4 gap-2"
        
    }

    const makeVideo = videosArray.map((video) => {
        const videoCard = document.createElement("div");
         videoCard.innerHTML = `
         <figure onclick="loadDetails('${video.video_id}')"  class="relative cursor-pointer">
              <img  class="w-full h-52 md:h-56 object-cover md:rounded-xl"
                src="${video.thumbnail}"
                alt="Shoes" />
                ${timeConveter(video.others.posted_date)?`<h3 class="absolute md:text-xs text-[9px] right-2 bottom-2 bg-black text-gray-200 rounded-md px-2 py-[2px]">${timeConveter(video.others.posted_date)}</h3>`:''}
                
            </figure>
            <div class="flex items-start px-2 md:px-0 md:pt-4 pt-2 gap-2 pb-2 md:pb-0">
               <div class="md:w-11 w-9 md:h-11 h-9 ">
                <img class="w-full h-full object-cover rounded-full" src="${video.authors[0].profile_picture}" alt="">
               </div>

               <div class="pt-[2px]  w-full flex-1">

                <h2 class="md:text-base text-sm font-bold w-full line-clamp-2"> ${video.title} </h2>
            <div class="flex items-center gap-1 md:flex-col md:items-start md:gap-0">
            
            <div class="flex items-center md:gap-2 gap-1 pt-0 md:pt-2">
             <p class="md:text-sm text-xs font-normal">${video.authors[0].profile_name}</p>
             <div>${video.authors[0].verified?'<i class="fa-solid fa-badge-check md:text-base text-xs text-[#FF3EFF]"></i>' : ""}</div>
            </div>
              
            <i class="fa-solid fa-circle-small text-[4px] pl-0 pr-1 md:hidden"></i>
            
             <p class="md:text-sm text-xs font-normal"> ${video.others.views} views </p>
            </div>
               
               
               </div>

            </div>

         `
         videosContainer.appendChild(videoCard)
         
        
         function timeConveter(date) {
            const year = parseInt(date / 31536000);
            const remainigSecondsYear = date % 31536000;
            const month = parseInt(remainigSecondsYear / 2621000);
            const remainingSecondsMonth = remainigSecondsYear % 2621000 ;
            const day = parseInt(remainingSecondsMonth / 86400);
            const remainigSecondsDay = remainingSecondsMonth % 86400;
            const hour = parseInt(remainigSecondsDay / 3600);
            const remainigSecondsHour = remainigSecondsDay % 3600;
            const minute = parseInt(remainigSecondsHour / 60) ;
            const remainigSecondsMinute = remainigSecondsHour % 60;
            const second = parseInt(remainigSecondsMinute)

           
            const array = [
                `${year} year`,
                `${month} month`,
                `${day} day`,
                `${hour} hour`,
                `${minute} minute`,
                `${second} second`,

            ];
            let originalTime = [];
            for (const time of array) {
                const timeNumber = parseInt(time)
                if (timeNumber > 0) {
                    originalTime.push(time)
                }
         
            }

            if (originalTime.length === 0) {
                return ''
            }
            else{

                return `${originalTime.join('  ')} ago`
            }
            
         }
     
    })
}

const filterBtn = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
    const data = await res.json();
    const video = await data.videos
   

    video.sort((a, b) => parseInt(b.others.views) - parseInt(a.others.views));
    displayVideos(video)
    const categoriesBtn = document.getElementsByClassName('categoriesBtn');
     for (const btn of categoriesBtn) {
          btn.classList.remove("bg-[#FF3EFF]/20")
      
     }

    allBtn.classList.add("bg-[#FF3EFF]/20")
}

// -----------navbar--------------------
const html = document.getElementById('html').dataset.theme


window.onscroll = function () {
    const header = document.getElementById('header');
    const logo = document.getElementById('logo');
  
       if (html === 'light') {
        if(document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50){
            header.classList.remove('bg-white')
            header.style.paddingBottom = "20px"
            
            header.style.borderBottomRightRadius = "30%"
            header.style.borderBottomLeftRadius = "30%"
           logo.style.color = "white"
        }
        else{
            header.classList.add('bg-white')
            header.style.paddingBottom = "8px"
            logo.style.color = "black"
             header.style.borderBottomRightRadius = "0%"
            header.style.borderBottomLeftRadius = "0%"

        }
       }
       else{
        if(document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50){
            header.classList.remove('bg-white')
            header.style.paddingBottom = "20px"
            
            header.style.borderBottomRightRadius = "30%"
            header.style.borderBottomLeftRadius = "30%"
          
        }
        else{
            header.classList.add('bg-white')
            header.style.paddingBottom = "8px"
              header.style.borderBottomRightRadius = "0%"
            header.style.borderBottomLeftRadius = "0%"
            

        }
       }
  
 }

