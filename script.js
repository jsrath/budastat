/* Menu Toggler
--------------------------------------------------- */

const sidebar = document.querySelector('.sidebar-container');
const main = document.querySelector('.main-container');
const menuToggle = document.querySelector('.menu-toggle');


function showMenu() {
  sidebar.classList.toggle('visible');
}

menuToggle.addEventListener('click', showMenu);

main.addEventListener('click', function () {
  if (sidebar.offsetParent !== null && window.innerWidth < 800) {
    showMenu();
  }
});

window.addEventListener('click', function (event) {
  if (sidebar.offsetParent !== null && window.innerWidth < 800 && event.pageY > main.getBoundingClientRect().bottom && event.pageX > sidebar.getBoundingClientRect().width) {
    showMenu();
  }
});

/* Sub Menu Toggler
--------------------------------------------------- */

const subMenu = document.getElementsByClassName('sub-menu');

for (let i = 0; i < subMenu.length; i++) {
  subMenu[i].addEventListener('click', function () {
    this.classList.toggle('active');
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
}


/* Colors
--------------------------------------------------- */

let rand = function () {
  return Math.floor(Math.random() * 14) + 1;
}

let getColor = function () {
  switch (rand()) {
    case 1:
      return ['#F8BBD0', ' #880E4F']
    case 2:
      return ['#E1BEE7', ' #4A148C']
    case 3:
      return ['#D1C4E9', ' #311B92']
    case 4:
      return ['#C5CAE9', ' #1A237E']
    case 5:
      return ['#BBDEFB', ' #0D47A1']
    case 6:
      return ['#B3E5FC', ' #01579B']
    case 7:
      return ['#B2EBF2', ' #006064']
    case 8:
      return ['#B2DFDB', ' #004D40']
    case 9:
      return ['#C8E6C9', ' #1B5E20']
    case 10:
      return ['#DCEDC8', ' #33691E']
    case 11:
      return ['#F0F4C3', ' #827717']
    case 12:
      return ['#FFF9C4', ' #F57F17']
    case 13:
      return ['#FFECB3', ' #FF6F00']
    case 14:
      return ['#FFE0B2', ' #E65100']
  }
}

function colorMap(data, description) {

  /* Get Data Values
  --------------------------------------------------- */

  let values = data.map(element => {
    return element[1]
  });

  let scaleColors = getColor();

  /* Get Start and End Colors
 --------------------------------------------------- */

  let color = d3.scaleLinear()
    .domain([d3.min(values), d3.max(values)])
    .range(scaleColors);

  /* Fill Map with Colors
  --------------------------------------------------- */

  data.forEach(function (d) {
    d3.select('g#' + d[0])
      .attr('fill', color(d[1]))
  });

  const scale = d3.select('.scale-container')
  const defs = scale.select('defs')

  defs.select('stop')
    .attr('offset', '0%')
    .attr('stop-color', scaleColors[0])
    .attr('stop-opacity', 1);

  defs.select('stop:nth-child(2)')
    .attr('offset', '100%')
    .attr('stop-color', scaleColors[1])
    .attr('stop-opacity', 1);

  scale.select('rect')
    .style('fill', 'url(#gradient)')
    .style('stroke', 'black')
    .style('stroke-width', '1px');


  /* Initialize Tooltip
  --------------------------------------------------- */

  let tooltip = d3.select('body')
    .append('div')
    .attr('class', 'tooltip');

  /* Set Tooltip Text and Behavior
  --------------------------------------------------- */

  data.forEach(function (d) {
    d3.select('g#' + d[0])
      .on('mouseover', function () {
        return tooltip.style('display', 'block').html(`<h2>District ${d[0].slice(2, 4)}</h2><p>${d[1] < 1 ? (d[1] * 100).toFixed(1) + '%' : Number(d[1]).toLocaleString()}</p>`);
      })
      .on('mousemove', function () {
        return tooltip.style('top', (d3.event.pageY + 20) + 'px').style('left', (d3.event.pageX + 30) + 'px');
      })
      .on('mouseout', function () {
        return tooltip.style('display', 'none');
      });
  });

  /* Set Data Description in the Header
  --------------------------------------------------- */

  document.getElementById('description').innerText = description;
  document.getElementById('scale-min').innerText = `${d3.min(values) < 1 ? (d3.min(values) * 100).toFixed(1) + '%' : Number(d3.min(values)).toLocaleString()}`;
  document.getElementById('scale-max').innerText = `${d3.max(values) < 1 ? (d3.max(values) * 100).toFixed(1) + '%' : Number(d3.max(values)).toLocaleString()}`;

}

/* Data
--------------------------------------------------- */

const unemployed = [
  ['bp1', 0.0394072356983194],
  ['bp2', 0.0307599380014588],
  ['bp3', 0.0496212780088237],
  ['bp4', 0.0561027227219079],
  ['bp5', 0.0477588258627529],
  ['bp6', 0.0585088337378324],
  ['bp7', 0.0682616369243934],
  ['bp8', 0.0800262295081967],
  ['bp9', 0.0538885188374247],
  ['bp10', 0.053928227419793],
  ['bp11', 0.0418258652603639],
  ['bp12', 0.0332703737718553],
  ['bp13', 0.0557296085068497],
  ['bp14', 0.0460199984253208],
  ['bp15', 0.0588235294117647],
  ['bp16', 0.0476538353470076],
  ['bp17', 0.0518007608347851],
  ['bp18', 0.052975157108194],
  ['bp19', 0.0557785115570231],
  ['bp20', 0.0589670281860841],
  ['bp21', 0.0630870694823796],
  ['bp22', 0.0493259347534634],
  ['bp23', 0.0638147010163082]
];

const population = [
  ['bp1', 24158],
  ['bp2', 87744],
  ['bp3', 126478],
  ['bp4', 98284],
  ['bp5', 25210],
  ['bp6', 38319],
  ['bp7', 56093],
  ['bp8', 76250],
  ['bp9', 61553],
  ['bp10', 80978],
  ['bp11', 143165],
  ['bp12', 57709],
  ['bp13', 119057],
  ['bp14', 127010],
  ['bp15', 79645],
  ['bp16', 71180],
  ['bp17', 84381],
  ['bp18', 98499],
  ['bp19', 59055],
  ['bp20', 64358],
  ['bp21', 75055],
  ['bp22', 53704],
  ['bp23', 21155]
];

const females = [
  ['bp1', 0.557951817203411],
  ['bp2', 0.546829412837345],
  ['bp3', 0.54631635541359],
  ['bp4', 0.542407716413658],
  ['bp5', 0.546013486711622],
  ['bp6', 0.552571831206451],
  ['bp7', 0.550015153405951],
  ['bp8', 0.535029508196721],
  ['bp9', 0.545139960684288],
  ['bp10', 0.519746103880066],
  ['bp11', 0.542520867530472],
  ['bp12', 0.550659342563552],
  ['bp13', 0.549207522447231],
  ['bp14', 0.557357688370994],
  ['bp15', 0.542532487915123],
  ['bp16', 0.534405731947176],
  ['bp17', 0.528957940768656],
  ['bp18', 0.533051096965451],
  ['bp19', 0.540326813986961],
  ['bp20', 0.541750831287486],
  ['bp21', 0.536819665578576],
  ['bp22', 0.526236406971548],
  ['bp23', 0.518978964783739]
];

const males = [
  ['bp1', 0.442048182796589],
  ['bp2', 0.453170587162655],
  ['bp3', 0.45368364458641],
  ['bp4', 0.457592283586342],
  ['bp5', 0.453986513288378],
  ['bp6', 0.447428168793549],
  ['bp7', 0.449984846594049],
  ['bp8', 0.464970491803279],
  ['bp9', 0.454860039315712],
  ['bp10', 0.480253896119934],
  ['bp11', 0.457479132469528],
  ['bp12', 0.449340657436448],
  ['bp13', 0.450792477552769],
  ['bp14', 0.442642311629006],
  ['bp15', 0.457467512084877],
  ['bp16', 0.465594268052824],
  ['bp17', 0.471042059231344],
  ['bp18', 0.466948903034549],
  ['bp19', 0.459673186013039],
  ['bp20', 0.458249168712514],
  ['bp21', 0.463180334421424],
  ['bp22', 0.473763593028452],
  ['bp23', 0.481021035216261],
];

const under30 = [
  ['bp1', 0.268358307806938],
  ['bp2', 0.289854576951131],
  ['bp3', 0.306148104808741],
  ['bp4', 0.318190142851329],
  ['bp5', 0.271400238000793],
  ['bp6', 0.315483180667554],
  ['bp7', 0.332982725117216],
  ['bp8', 0.344813114754098],
  ['bp9', 0.354767436193199],
  ['bp10', 0.319802909432191],
  ['bp11', 0.329493940558097],
  ['bp12', 0.285709334765808],
  ['bp13', 0.304929571549762],
  ['bp14', 0.308267065585387],
  ['bp15', 0.296892460292548],
  ['bp16', 0.303989884799101],
  ['bp17', 0.315616074708761],
  ['bp18', 0.305728992172509],
  ['bp19', 0.3000254000508],
  ['bp20', 0.295176978774977],
  ['bp21', 0.302911198454467],
  ['bp22', 0.324631312378966],
  ['bp23', 0.322240605057906],
];

const thirtyto49 = [

  ['bp1', 0.271587051908271],
  ['bp2', 0.270970094821298],
  ['bp3', 0.304321700216638],
  ['bp4', 0.326197549957267],
  ['bp5', 0.264260214200714],
  ['bp6', 0.307523682768339],
  ['bp7', 0.305902697306259],
  ['bp8', 0.305140983606557],
  ['bp9', 0.307523597550079],
  ['bp10', 0.336029538887105],
  ['bp11', 0.275437432333322],
  ['bp12', 0.268519641650349],
  ['bp13', 0.326885441427216],
  ['bp14', 0.310920399968506],
  ['bp15', 0.312988888191349],
  ['bp16', 0.300210733352065],
  ['bp17', 0.310863820054278],
  ['bp18', 0.316185951126407],
  ['bp19', 0.306409279485226],
  ['bp20', 0.315438640106902],
  ['bp21', 0.31031909932716],
  ['bp22', 0.293088038134962],
  ['bp23', 0.310659418577169],
];
const over50 = [
  ['bp1', 0.460054640284792],
  ['bp2', 0.439175328227571],
  ['bp3', 0.38953019497462],
  ['bp4', 0.355612307191405],
  ['bp5', 0.464339547798493],
  ['bp6', 0.376993136564107],
  ['bp7', 0.361114577576525],
  ['bp8', 0.350045901639344],
  ['bp9', 0.337708966256722],
  ['bp10', 0.344167551680703],
  ['bp11', 0.395068627108581],
  ['bp12', 0.445771023583843],
  ['bp13', 0.368184987023023],
  ['bp14', 0.380812534446107],
  ['bp15', 0.390118651516103],
  ['bp16', 0.395799381848834],
  ['bp17', 0.373520105236961],
  ['bp18', 0.378085056701083],
  ['bp19', 0.393565320463974],
  ['bp20', 0.389384381118121],
  ['bp21', 0.386769702218373],
  ['bp22', 0.382280649486072],
  ['bp23', 0.367099976364926],
];

const married = [
  ["bp1", 0.388350857775318],
  ["bp2", 0.472708058124174],
  ["bp3", 0.414149226569609],
  ["bp4", 0.410012212879891],
  ["bp5", 0.35067264573991],
  ["bp6", 0.304505217907746],
  ["bp7", 0.287527250077857],
  ["bp8", 0.295963865045822],
  ["bp9", 0.306485449427122],
  ["bp10", 0.36759825450848],
  ["bp11", 0.387033831628639],
  ["bp12", 0.450983910520964],
  ["bp13", 0.351464474237399],
  ["bp14", 0.373587904875021],
  ["bp15", 0.397532880598298],
  ["bp16", 0.486254745385522],
  ["bp17", 0.470723497388871],
  ["bp18", 0.443971832317217],
  ["bp19", 0.419849265854421],
  ["bp20", 0.405273542600897],
  ["bp21", 0.40323025529437],
  ["bp22", 0.462738943743325],
  ["bp23", 0.43062855891371],
];

const divorced = [
  ["bp1", 0.138812027301236],
  ["bp2", 0.11449141347424],
  ["bp3", 0.140018198362147],
  ["bp4", 0.144934003475974],
  ["bp5", 0.141319666880205],
  ["bp6", 0.137984671512203],
  ["bp7", 0.147364528184366],
  ["bp8", 0.155984488693303],
  ["bp9", 0.13508812823869],
  ["bp10", 0.14781601728545],
  ["bp11", 0.12162077104642],
  ["bp12", 0.117072392686963],
  ["bp13", 0.144420049516513],
  ["bp14", 0.13944578894257],
  ["bp15", 0.150018625175506],
  ["bp16", 0.111582013352533],
  ["bp17", 0.119474726766494],
  ["bp18", 0.132461363958599],
  ["bp19", 0.136480787253983],
  ["bp20", 0.146224215246637],
  ["bp21", 0.144304146618039],
  ["bp22", 0.115826412955819],
  ["bp23", 0.126861585632939],
];

const children = [
  ["bp1", 102],
  ["bp2", 117],
  ["bp3", 119],
  ["bp4", 120],
  ["bp5", 96],
  ["bp6", 89],
  ["bp7", 90],
  ["bp8", 101],
  ["bp9", 91],
  ["bp10", 119],
  ["bp11", 103],
  ["bp12", 114],
  ["bp13", 96],
  ["bp14", 99],
  ["bp15", 124],
  ["bp16", 126],
  ["bp17", 132],
  ["bp18", 128],
  ["bp19", 124],
  ["bp20", 125],
  ["bp21", 129],
  ["bp22", 129],
  ["bp23", 134],
];

const university = [
  ["bp1", 0.489813916571126],
  ["bp2", 0.503384032289821],
  ["bp3", 0.298675642677881],
  ["bp4", 0.228987693182067],
  ["bp5", 0.403205207432126],
  ["bp6", 0.357020197890261],
  ["bp7", 0.299247083379925],
  ["bp8", 0.252930630257895],
  ["bp9", 0.335052783109405],
  ["bp10", 0.190333884297521],
  ["bp11", 0.381932541397761],
  ["bp12", 0.507448162287596],
  ["bp13", 0.337255566657151],
  ["bp14", 0.328975300737945],
  ["bp15", 0.179934074439833],
  ["bp16", 0.267859839903338],
  ["bp17", 0.195690699305157],
  ["bp18", 0.193474109237737],
  ["bp19", 0.207414248976783],
  ["bp20", 0.175894896547125],
  ["bp21", 0.154029918662192],
  ["bp22", 0.256175993268017],
  ["bp23", 0.154082506422203],
];

const retired = [
  ["bp1", 0.311118470072026],
  ["bp2", 0.301171590080233],
  ["bp3", 0.272165910276886],
  ["bp4", 0.24228765618005],
  ["bp5", 0.319000396667989],
  ["bp6", 0.253816644484459],
  ["bp7", 0.251136505446312],
  ["bp8", 0.239947540983607],
  ["bp9", 0.24367618150212],
  ["bp10", 0.281409765615352],
  ["bp11", 0.285921838438166],
  ["bp12", 0.312793498414459],
  ["bp13", 0.261924960313127],
  ["bp14", 0.284174474450831],
  ["bp15", 0.284625525770607],
  ["bp16", 0.280106771565046],
  ["bp17", 0.2617176852609],
  ["bp18", 0.278784556188388],
  ["bp19", 0.275167217001101],
  ["bp20", 0.291820752664781],
  ["bp21", 0.278129371794018],
  ["bp22", 0.26945851333234],
  ["bp23", 0.264476483100922],
];

const hungarian = [
  ["bp1", 0.889723530980532],
  ["bp2", 0.888547156941775],
  ["bp3", 0.927875039312297],
  ["bp4", 0.935808481775524],
  ["bp5", 0.854747816286278],
  ["bp6", 0.859140373274971],
  ["bp7", 0.873044633689678],
  ["bp8", 0.86605931953535],
  ["bp9", 0.882456420917959],
  ["bp10", 0.896828682619856],
  ["bp11", 0.919708580272545],
  ["bp12", 0.896426430245444],
  ["bp13", 0.90346978931708],
  ["bp14", 0.916529839782921],
  ["bp15", 0.934988750707394],
  ["bp16", 0.932251158922549],
  ["bp17", 0.943810753141382],
  ["bp18", 0.930603225878816],
  ["bp19", 0.929728410818521],
  ["bp20", 0.930028953536468],
  ["bp21", 0.936632486253529],
  ["bp22", 0.931657964772566],
  ["bp23", 0.907765257737215],
];

const catholics = [
  ["bp1", 0.372878549548804],
  ["bp2", 0.34949398249453],
  ["bp3", 0.305523490251269],
  ["bp4", 0.275528061535957],
  ["bp5", 0.294486314954383],
  ["bp6", 0.261436885096166],
  ["bp7", 0.266468186761271],
  ["bp8", 0.27607868852459],
  ["bp9", 0.291618605104544],
  ["bp10", 0.270517918446986],
  ["bp11", 0.340655886564454],
  ["bp12", 0.378658441490929],
  ["bp13", 0.255188691131139],
  ["bp14", 0.302425005905047],
  ["bp15", 0.29343963839538],
  ["bp16", 0.319415566170273],
  ["bp17", 0.298503217548974],
  ["bp18", 0.287698352267536],
  ["bp19", 0.293031919397172],
  ["bp20", 0.279654433015321],
  ["bp21", 0.26290053960429],
  ["bp22", 0.335431252793088],
  ["bp23", 0.329614748286457],
];

const jews = [
  ["bp1", 0.00778210116731518],
  ["bp2", 0.0107015864332604],
  ["bp3", 0.00339189424247695],
  ["bp4", 0.00243172846038012],
  ["bp5", 0.0125347084490282],
  ["bp6", 0.00947310733578642],
  ["bp7", 0.0120335870786016],
  ["bp8", 0.00445901639344262],
  ["bp9", 0.00375286338602505],
  ["bp10", 0.00142013880313171],
  ["bp11", 0.00407920930394999],
  ["bp12", 0.00880278639380339],
  ["bp13", 0.0104907733270618],
  ["bp14", 0.00655853869774034],
  ["bp15", 0.00205913742231151],
  ["bp16", 0.00258499578533296],
  ["bp17", 0.00137471705715742],
  ["bp18", 0.000923867247383222],
  ["bp19", 0.00149013631360596],
  ["bp20", 0.00141396562975854],
  ["bp21", 0.000919325827726334],
  ["bp22", 0.00182481751824818],
  ["bp23", 0.000709052233514536],
];


const noReligion = [
  ["bp1", 0.140615945028562],
  ["bp2", 0.153936451495259],
  ["bp3", 0.201940258384857],
  ["bp4", 0.240334133734891],
  ["bp5", 0.138833796112654],
  ["bp6", 0.178527623372217],
  ["bp7", 0.187866578717487],
  ["bp8", 0.183934426229508],
  ["bp9", 0.20713856351437],
  ["bp10", 0.219565807997234],
  ["bp11", 0.178046310201516],
  ["bp12", 0.14862499783396],
  ["bp13", 0.202390451632411],
  ["bp14", 0.191701440831431],
  ["bp15", 0.217527779521627],
  ["bp16", 0.185332958696263],
  ["bp17", 0.196868963392233],
  ["bp18", 0.213525010406197],
  ["bp19", 0.213157226314453],
  ["bp20", 0.213151434165139],
  ["bp21", 0.25416028245953],
  ["bp22", 0.204621629673767],
  ["bp23", 0.188938785157173],
];

const peoplePerHousehold = [
  ["bp1", 1.78],
  ["bp2", 2.05],
  ["bp3", 2.13],
  ["bp4", 2.19],
  ["bp5", 1.68],
  ["bp6", 1.71],
  ["bp7", 1.77],
  ["bp8", 1.86],
  ["bp9", 1.78],
  ["bp10", 2.11],
  ["bp11", 1.91],
  ["bp12", 1.97],
  ["bp13", 1.82],
  ["bp14", 1.87],
  ["bp15", 2.18],
  ["bp16", 2.38],
  ["bp17", 2.51],
  ["bp18", 2.32],
  ["bp19", 2.23],
  ["bp20", 2.18],
  ["bp21", 2.27],
  ["bp22", 2.38],
  ["bp23", 2.46],
]

const familySize = [
  ["bp1", 2.61],
  ["bp2", 2.75],
  ["bp3", 2.74],
  ["bp4", 2.78],
  ["bp5", 2.46],
  ["bp6", 2.49],
  ["bp7", 2.51],
  ["bp8", 2.6],
  ["bp9", 2.54],
  ["bp10", 2.74],
  ["bp11", 2.64],
  ["bp12", 2.72],
  ["bp13", 2.55],
  ["bp14", 2.61],
  ["bp15", 2.74],
  ["bp16", 2.83],
  ["bp17", 2.89],
  ["bp18", 2.82],
  ["bp19", 2.76],
  ["bp20", 2.74],
  ["bp21", 2.78],
  ["bp22", 2.85],
  ["bp23", 2.89],
];

const singleParent = [
  ["bp1", 0.107764741050744],
  ["bp2", 0.111246826651339],
  ["bp3", 0.15073611708997],
  ["bp4", 0.152281868638069],
  ["bp5", 0.112524796497708],
  ["bp6", 0.113354249079252],
  ["bp7", 0.125234673399366],
  ["bp8", 0.132518773068601],
  ["bp9", 0.113364055299539],
  ["bp10", 0.147692821183211],
  ["bp11", 0.114043503787608],
  ["bp12", 0.109584201787544],
  ["bp13", 0.119203945715004],
  ["bp14", 0.117857198088551],
  ["bp15", 0.159245241010798],
  ["bp16", 0.134741515589788],
  ["bp17", 0.149827249511792],
  ["bp18", 0.146108524185118],
  ["bp19", 0.151288127818974],
  ["bp20", 0.139615279299014],
  ["bp21", 0.15994432415713],
  ["bp22", 0.141171109592162],
  ["bp23", 0.151017029328288],
];

const dwellings = [
  ["bp1", 16974],
  ["bp2", 48700],
  ["bp3", 62655],
  ["bp4", 46980],
  ["bp5", 19687],
  ["bp6", 27795],
  ["bp7", 36719],
  ["bp8", 44441],
  ["bp9", 39515],
  ["bp10", 38460],
  ["bp11", 78219],
  ["bp12", 33537],
  ["bp13", 72821],
  ["bp14", 72447],
  ["bp15", 37172],
  ["bp16", 30493],
  ["bp17", 33036],
  ["bp18", 43570],
  ["bp19", 27311],
  ["bp20", 30958],
  ["bp21", 32989],
  ["bp22", 22593],
  ["bp23", 8660],
];

const unoccupied = [
  ["bp1", 0.228525980911983],
  ["bp2", 0.167289527720739],
  ["bp3", 0.10415768893145],
  ["bp4", 0.0843763303533418],
  ["bp5", 0.290851831157617],
  ["bp6", 0.2495772620975],
  ["bp7", 0.195103352487813],
  ["bp8", 0.152269300870817],
  ["bp9", 0.185651018600531],
  ["bp10", 0.0976599063962559],
  ["bp11", 0.138917654278372],
  ["bp12", 0.177028356740317],
  ["bp13", 0.147814504057895],
  ["bp14", 0.130026088036772],
  ["bp15", 0.0789841816420962],
  ["bp16", 0.0803791034007805],
  ["bp17", 0.0573313960527909],
  ["bp18", 0.082120725269681],
  ["bp19", 0.0807000842151514],
  ["bp20", 0.0938691129917953],
  ["bp21", 0.067598290339204],
  ["bp22", 0.0855132120568318],
  ["bp23", 0.0867205542725173],
];

const rooms = [
  ["bp1", 2.32],
  ["bp2", 2.95],
  ["bp3", 2.63],
  ["bp4", 2.48],
  ["bp5", 2.24],
  ["bp6", 2.12],
  ["bp7", 1.94],
  ["bp8", 1.94],
  ["bp9", 2.04],
  ["bp10", 2.24],
  ["bp11", 2.49],
  ["bp12", 2.73],
  ["bp13", 2.13],
  ["bp14", 2.26],
  ["bp15", 2.65],
  ["bp16", 3.11],
  ["bp17", 3.15],
  ["bp18", 2.82],
  ["bp19", 2.69],
  ["bp20", 2.39],
  ["bp21", 2.59],
  ["bp22", 2.97],
  ["bp23", 2.85],
];

const governmentBuildings = [
  ["bp1", 1468],
  ["bp2", 658],
  ["bp3", 3399],
  ["bp4", 2373],
  ["bp5", 1296],
  ["bp6", 1090],
  ["bp7", 2812],
  ["bp8", 5104],
  ["bp9", 4189],
  ["bp10", 2484],
  ["bp11", 1634],
  ["bp12", 1234],
  ["bp13", 6602],
  ["bp14", 2665],
  ["bp15", 1982],
  ["bp16", 332],
  ["bp17", 765],
  ["bp18", 1332],
  ["bp19", 882],
  ["bp20", 662],
  ["bp21", 1492],
  ["bp22", 694],
  ["bp23", 77],
];

const oldBuildings = [
  ["bp1", 0.619549846806505],
  ["bp2", 0.3559896475228],
  ["bp3", 0.120179486770037],
  ["bp4", 0.15997445177773],
  ["bp5", 0.911090789005741],
  ["bp6", 0.876345053442257],
  ["bp7", 0.891712978097417],
  ["bp8", 0.705810838192584],
  ["bp9", 0.459108512415521],
  ["bp10", 0.21063176519567],
  ["bp11", 0.24807193011626],
  ["bp12", 0.399994035726001],
  ["bp13", 0.375437825364339],
  ["bp14", 0.224743918937574],
  ["bp15", 0.20773453899564],
  ["bp16", 0.164736755781532],
  ["bp17", 0.117312003878083],
  ["bp18", 0.127614630450256],
  ["bp19", 0.337617635211835],
  ["bp20", 0.244473173884939],
  ["bp21", 0.0842909553985628],
  ["bp22", 0.176223156962586],
  ["bp23", 0.3239241092087],
];

const newBuildings = [
  ["bp1", 0.00848456280933302],
  ["bp2", 0.0258401117410237],
  ["bp3", 0.0394423774012743],
  ["bp4", 0.0390887800723866],
  ["bp5", 0.00558857897678199],
  ["bp6", 0.0513189621045813],
  ["bp7", 0.0382205513784461],
  ["bp8", 0.0844271337550938],
  ["bp9", 0.0896296858784519],
  ["bp10", 0.0674958368026645],
  ["bp11", 0.0672746108688145],
  ["bp12", 0.0107058718277518],
  ["bp13", 0.0908479046193151],
  ["bp14", 0.0754990474612772],
  ["bp15", 0.0195112761720222],
  ["bp16", 0.0643923240938166],
  ["bp17", 0.0832575895291765],
  ["bp18", 0.0785709365600533],
  ["bp19", 0.0284887765937969],
  ["bp20", 0.0456690368455074],
  ["bp21", 0.0341105484976198],
  ["bp22", 0.0615895505866726],
  ["bp23", 0.0396807033780657],
];

const floorSpace = [
  ["bp1", 65],
  ["bp2", 83],
  ["bp3", 65],
  ["bp4", 59],
  ["bp5", 69],
  ["bp6", 62],
  ["bp7", 55],
  ["bp8", 54],
  ["bp9", 54],
  ["bp10", 54],
  ["bp11", 63],
  ["bp12", 75],
  ["bp13", 53],
  ["bp14", 57],
  ["bp15", 63],
  ["bp16", 84],
  ["bp17", 83],
  ["bp18", 73],
  ["bp19", 62],
  ["bp20", 62],
  ["bp21", 64],
  ["bp22", 78],
  ["bp23", 76],
];

/* Event Listeners for Each Data Set
---------------------------------------------------------------------- */

/* Population
--------------------------------------------------- */

const pop = document.getElementById('population');
pop.addEventListener('click', () => {
  colorMap(population, 'Population by District');
});

/* Unemployment
--------------------------------------------------- */

const unemp = document.getElementById('unemployment');
unemp.addEventListener('click', () => {
  colorMap(unemployed, 'Unemployment Rate by District');
});

/* Females
--------------------------------------------------- */

const fem = document.getElementById('females');
fem.addEventListener('click', () => {
  colorMap(females, 'Percentage of Females by District');
});

/* Males
--------------------------------------------------- */

const mal = document.getElementById('males');
mal.addEventListener('click', () => {
  colorMap(males, 'Percentage of Males by District');
});

/* Under 30
--------------------------------------------------- */

const u30 = document.getElementById('u30');
u30.addEventListener('click', () => {
  colorMap(under30, 'Percentage of District Population Under 30');
});

/* 30 - 49
--------------------------------------------------- */

const thirtyforty = document.getElementById('thirtyto49');
thirtyforty.addEventListener('click', () => {
  colorMap(thirtyto49, 'Percentage of District Population Aged 30 - 49');
});

/* Over 50
--------------------------------------------------- */

const o50 = document.getElementById('over50');
o50.addEventListener('click', () => {
  colorMap(over50, 'Percentage of District Population Over 50');
});

/* Married
--------------------------------------------------- */

const isMarried = document.getElementById('married');
isMarried.addEventListener('click', () => {
  colorMap(married, 'Percentage of District Population That is Married');
});

/* Divorced
--------------------------------------------------- */

const isDivorced = document.getElementById('divorced');
isDivorced.addEventListener('click', () => {
  colorMap(divorced, 'Percentage of District Population That is Divorced');
});

/* Children
--------------------------------------------------- */

const noOfChildren = document.getElementById('children');
noOfChildren.addEventListener('click', () => {
  colorMap(children, 'Number of Children Per 100 Adult Women');
});

/* University
--------------------------------------------------- */

const graduates = document.getElementById('university');
graduates.addEventListener('click', () => {
  colorMap(university, 'Percentage of District Population with a University Degree');
});

/* Retired
--------------------------------------------------- */

const retirees = document.getElementById('retired');
retirees.addEventListener('click', () => {
  colorMap(retired, 'Percentage of District Population that is Retired');
});

/* Hungarian
--------------------------------------------------- */
const huns = document.getElementById('hungarian');
huns.addEventListener('click', () => {
  colorMap(hungarian, 'Percentage of Hungarian Nationals Living in Each District');
});

/* Catholics
--------------------------------------------------- */
const cath = document.getElementById('catholics');
cath.addEventListener('click', () => {
  colorMap(catholics, 'Percentage of Catholics by District');
});

/* Jews
--------------------------------------------------- */
const jewish = document.getElementById('jews');
jewish.addEventListener('click', () => {
  colorMap(jews, 'Percentage of Jews by District');
});


/* No Religion
--------------------------------------------------- */
const noRel = document.getElementById('noReligion');
noRel.addEventListener('click', () => {
  colorMap(noReligion, 'Percentage of Population Which is Not Religious');
});


/* People Per Household
--------------------------------------------------- */
const pph = document.getElementById('peoplePerHousehold');
pph.addEventListener('click', () => {
  colorMap(peoplePerHousehold, 'Number of People Per Household');
});


/* Family Size
--------------------------------------------------- */
const famSize = document.getElementById('familySize');
famSize.addEventListener('click', () => {
  colorMap(familySize, 'Family Size by District');
});


/* Single Parent
--------------------------------------------------- */
const singPar = document.getElementById('singleParent');
singPar.addEventListener('click', () => {
  colorMap(singleParent, 'Percentage of Single Parent Households');
});


/* Dwellings
--------------------------------------------------- */
const dwell = document.getElementById('dwellings');
dwell.addEventListener('click', () => {
  colorMap(dwellings, 'Number of Dwellings in Each District');
});


/* Unoccupied
--------------------------------------------------- */
const unocc = document.getElementById('unoccupied');
unocc.addEventListener('click', () => {
  colorMap(unoccupied, 'Number of Unoccupied Dwellings in Each District');
});


/* Rooms
--------------------------------------------------- */
const noOfRooms = document.getElementById('rooms');
noOfRooms.addEventListener('click', () => {
  colorMap(rooms, 'Average Number of Rooms Per Dwelling');
});


/* Government Buildings
--------------------------------------------------- */
const govBuild = document.getElementById('governmentBuildings');
govBuild.addEventListener('click', () => {
  colorMap(governmentBuildings, 'Number of Government Buildings Per District');
});

/* Old Buildings
--------------------------------------------------- */
const oldBuild = document.getElementById('oldBuildings');
oldBuild.addEventListener('click', () => {
  colorMap(oldBuildings, 'Percentage of Buildings Built Before 1946');
});

/* New Buildings
--------------------------------------------------- */
const newBuild = document.getElementById('newBuildings');
newBuild.addEventListener('click', () => {
  colorMap(newBuildings, 'Percentage of Buildings Built After 2005');
});

/* Floor Space
--------------------------------------------------- */
const flSpace = document.getElementById('floorSpace');
flSpace.addEventListener('click', () => {
  colorMap(floorSpace, 'Average Floor Space Per Dwelling (m2)');
});






colorMap(population, 'Population by District');
