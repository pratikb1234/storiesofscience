/* Further teaching relationships and explicitly contextual reading routes. */
Object.assign(sources,{
bernalHodgkin:['IUCr · Dorothy Hodgkin','https://www.iucr.org/what-we-do/awards-and-prizes/nobel-prize/hodgkin'],
bernalPerutz:['IUCr · Max Perutz','https://www.iucr.org/what-we-do/awards-and-prizes/nobel-prize/perutz'],
wheelerFeynman:['University of Texas · John Wheeler and his students','https://endowments.giving.utexas.edu/john-a-wheeler-graduate-fellowship-in-physics/'],
thorneBio:['Nobel Prize · Kip Thorne autobiography','https://www.nobelprize.org/prizes/physics/2017/thorne/biographical/'],
churchTuring:['Princeton University · Turing at Princeton','https://manuscripts.blogs.princeton.edu/2015/01/29/alan-m-turing-and-princeton/'],
bornMayer:['Nobel Prize · Maria Goeppert Mayer','https://www.nobelprize.org/stories/women-who-changed-science/maria-goeppert-mayer/'],
szostakDoudna:['Nobel Prize · Jack Szostak autobiography','https://www.nobelprize.org/prizes/medicine/2009/szostak/biographical/'],
cechDoudna:['Kavli Prize · Jennifer Doudna autobiography','https://www.kavliprize.org/jennifer-doudna-autobiography'],
hardyMentor:['Trinity College · Hardy and Ramanujan','https://explore.trin.cam.ac.uk/assets/hardy/']
});
people.push(
{id:'bernal',title:'J. D. Bernal',field:'Chemistry',fields:['Chemistry','Biology'],year:1932,source:'bernalHodgkin',location:'Cambridge, Britain',subtitle:'Crystallographer and research mentor',text:'Bernal developed the study of biological molecules through X ray crystallography. Dorothy Hodgkin and Max Perutz undertook research in his Cambridge group, helping establish structural biology.',contributions:[]},
{id:'wheeler',title:'John Archibald Wheeler',field:'Mechanics',fields:['Mechanics','Quantum'],year:1942,source:'wheelerFeynman',location:'Princeton, United States',subtitle:'Theoretical physicist and doctoral adviser',text:'Wheeler supervised Richard Feynman and later Kip Thorne at Princeton. These teaching links connect different generations of theoretical physics; they do not imply that Wheeler coauthored every later achievement of his students.',contributions:[]}
);
const furtherMentors=[
['born','pauli','Pauli worked as Born’s assistant after completing his doctorate; Born was not his doctoral adviser.','pauliBio'],
['bohr','pauli','Pauli worked with Bohr in Copenhagen after his doctoral studies.','pauliBio'],
['born','goeppert','Goeppert Mayer completed her doctorate under Born at Göttingen.','bornMayer'],
['wheeler','feynman','Wheeler was Feynman’s doctoral adviser at Princeton.','wheelerFeynman'],
['wheeler','thorne','Thorne completed his Princeton doctorate under Wheeler.','thorneBio'],
['bernal','hodgkin','Hodgkin carried out graduate research on biological molecules with Bernal at Cambridge.','bernalHodgkin'],
['bernal','perutz','Perutz joined Bernal’s Cambridge laboratory in 1936 to pursue crystallographic research.','bernalPerutz'],
['church','turing','Church supervised Turing’s doctorate at Princeton, completed in 1938.','churchTuring'],
['hardy','ramanujan','Hardy supported and collaborated with Ramanujan at Cambridge. This was not a doctoral supervision.','hardyMentor'],
['szostak','doudna','Doudna studied catalytic RNA as a graduate student in Szostak’s laboratory.','szostakDoudna'],
['cech','doudna','Doudna undertook postdoctoral research in Cech’s laboratory, studying RNA structure.','cechDoudna']
];
for(const [a,b,text,source] of furtherMentors)if(!peopleEdges.some(e=>e[0]===a&&e[1]===b&&e[2]==='Mentorship'))peopleEdges.push([a,b,'Mentorship',text,source]);
const contextualRoutes=`
rhind|euclid-elements|Compare surviving Egyptian calculation problems with the later Greek axiomatic tradition. This is not a claim of direct textual transmission.
babylon|ptolemy-model|Explore numerical planetary astronomy alongside the later Greek geometric tradition; this comparison does not establish a particular borrowing.
archimedes-lever|motion|Compare ancient reasoning about equilibrium with early modern mathematical studies of motion.
archimedes-buoyancy|gas-law|Compare two episodes in the mathematical study of fluids; no direct dependency is asserted.
optics-book|interference|Explore how explanations of light changed from geometrical optics to wave phenomena.
earth-size|biruni-earth|Two approaches to estimating Earth’s size, separated by centuries and different methods.
anatomy|circulation|Compare the study of bodily structures with experiments on the movement of blood.
magnet-earth|oersted|Earth’s magnetism and the connection between current and magnetism address different magnetic phenomena.
logarithms|planet-laws|Explore calculation techniques alongside early modern planetary astronomy, without assigning a single causal chain.
probability|statistical-mechanics|Follow the broader theme of mathematical reasoning about uncertainty into molecular physics.
classification|evolution|Compare classifying organisms with explaining their diversity and common ancestry.
herschel|exoplanet-sun|Follow two different episodes in identifying planets: a nearby Solar System body and a planet orbiting another star.
urea-synthesis|ammonia|Compare laboratory synthesis in organic chemistry with industrial synthesis of ammonia.
anesthesia|antisepsis|Two distinct changes to surgical practice: controlling pain and reducing infection.
hygiene|antisepsis|Compare infection prevention in maternity wards with antiseptic surgical methods.
ramanujan-partitions|gauss-numbers|Explore two strands of number theory; this is a reading comparison, not a direct influence claim.
stellar-composition|atomic-number|Atomic spectra and the identities of elements connect stellar astronomy with laboratory atomic physics.
raman-scattering|compton-effect|Two different ways that scattering reveals interactions between light and matter.
incompleteness|turing-machine|Explore distinct mathematical limits on formal proof and algorithmic computation.
cyclotron|higgs-detected|Follow the history of particle acceleration from early instruments to modern high energy experiments.
mobile-genes|dna-isolated|Compare identifying genetic material with understanding how genetic elements can move.
vaccination|polio|Compare vaccination against smallpox and polio, which used different pathogens and techniques.
parity|electroweak|Explore how experiments on weak interactions and theories of those interactions changed particle physics.
laser-light|attosecond-pulses|Compare generating coherent light with techniques for observing processes on extremely short timescales.
quark-model|higgs-detected|Explore two parts of modern particle physics: constituents of hadrons and the Higgs field.
pulsars|gravity-waves|Compare different astronomical observations relevant to strong gravity. Pulsars are not the instruments used by LIGO.
gravity|moon-landing|Explore gravitational physics alongside the navigation and engineering of lunar exploration.
dark-matter|accelerating-universe|Two different cosmological puzzles: unseen gravitating matter and accelerating expansion.
ozone-cfc|climate-models|Compare two separate atmospheric research problems: ozone depletion and climate change.
cell-theory|ivf-birth|Explore cellular biology alongside later reproductive medicine; this is a broad contextual link.
germ-proof|hpylori|Compare the nineteenth century study of microbial disease with later evidence connecting a bacterium to ulcers.
germ-proof|hiv-discovery|Follow the broader study of infectious agents from bacterial investigations to identifying a human retrovirus.
information|web-invention|Compare communication theory with a later system for linking information on the internet.
transistor-point|blue-led|Explore two distinct uses of semiconductor materials.
quantum-teleport|uncertainty|Explore quantum information alongside foundational limits on quantum measurements; uncertainty alone does not explain teleportation.
mrna|rna-interference|Compare RNA carrying genetic instructions with RNA participating in gene regulation.
protein-design|protein-ai|Compare engineering a protein with computationally predicting protein structure.
cell-theory|ips-cells|Compare the cell as a biological unit with later techniques that change cellular identity.
hypatia-commentary|euclid-elements|Explore Greek mathematical texts and the later scholarly culture that studied and commented on mathematics.
zhu-algebra|algebra|Compare independent traditions of algebraic problem solving; no direct borrowing is asserted.
euler-graphs|web-invention|Explore networks as mathematical objects and as linked information systems.
galois-groups|exclusion|Compare mathematical symmetry with symmetry constraints in quantum physics; this is not a claim of direct personal influence.
photosynthesis|oxygen|Compare oxygen production by plants with investigations of oxygen’s chemical properties.
blood-groups|insulin-discovery|Two distinct developments that made twentieth century treatment more effective.
ngf-growth|neuron-doctrine|Compare identifying discrete nerve cells with studying factors that influence their growth.
radioimmunoassay|insulin-discovery|Compare discovering a hormone’s therapeutic role with measuring very small hormone concentrations.
catalytic-rna|telomerase|Explore RNA’s catalytic activity alongside an enzyme complex that uses RNA to maintain chromosome ends.
xray-crystals|quasicrystal|Compare conventional crystal structure with ordered materials that lack ordinary periodicity.
fluorescent-protein|cells|Follow changing methods of observing cells, from early microscopy to fluorescent labels.
molecular-motor|protein-design|Compare engineered molecular machines with engineered proteins; they are distinct research programmes.
graphene|transistor-point|Explore how the properties of materials inform electronic research, without implying that graphene was necessary for the first transistor.
myoglobin|cryo-em|Compare methods that reveal molecular structures: crystallography and electron microscopy.
orbital-ice|climate-models|Compare long term orbital influences with modelling atmospheric and oceanic climate processes.
cosmic-india|moon-landing|Explore different space research traditions and programmes; no direct causal dependency is claimed.
`;
for(const row of contextualRoutes.trim().split('\n')){const [a,b,text]=row.split('|');if(!discoveryEdges.some(e=>e[0]===a&&e[1]===b))discoveryEdges.push([a,b,'Context',text,discoveries.find(d=>d.id===b).source]);}
