/* Explicit relationships. Context links are curated comparisons, not claims of direct transmission. */
Object.assign(sources,{
heisenbergBio:['Nobel Prize · Heisenberg biography','https://www.nobelprize.org/prizes/physics/1932/heisenberg/biographical/'],
pauliBio:['Nobel Prize · Pauli biography','https://www.nobelprize.org/prizes/physics/1945/pauli/biographical/'],
glashowBio:['Nobel Prize · Glashow autobiography','https://www.nobelprize.org/prizes/physics/1979/glashow/biographical/'],
greiderBio:['UC Berkeley · Greider and her adviser','https://grad.berkeley.edu/news/profiles/carol-greider/'],
mayorBio:['University of Geneva · Mayor and Queloz','https://www.unige.ch/medias/en/2019/michel-mayor-et-didier-queloz-laureats-du-prix-nobel-de-physique-2019'],
keplerLaws:['University of St Andrews · Kepler’s laws','https://mathshistory.st-andrews.ac.uk/HistTopics/Keplers_laws/'],
completeGenome:['NHGRI · First complete human genome','https://www.genome.gov/news/news-release/researchers-generate-the-first-complete-gapless-sequence-of-a-human-genome'],
shell:['Nobel Prize · Nuclear shell model','https://www.nobelprize.org/prizes/physics/1963/mayer/facts/'],
pasteurLister:['Science Museum · Joseph Lister','https://www.sciencemuseum.org.uk/objects-and-stories/medicine/joseph-lister'],
shannonLogic:['MIT · Shannon’s switching circuit thesis','https://dspace.mit.edu/handle/1721.1/11173']
});
discoveries.find(d=>d.id==='complete-genome').source='completeGenome';
discoveries.find(d=>d.id==='shell-model').source='shell';
// Activity dates describe contributions in this atlas, never birth dates.
people.push({id:'sommerfeld',title:'Arnold Sommerfeld',field:'Quantum',subtitle:'Theoretical physicist and teacher',year:1923,source:'heisenbergBio',location:'Germany',text:'Taught a generation of theoretical physicists, including Heisenberg and Pauli. His role here is a documented teacher relationship, distinct from being a coauthor of their later discoveries.',contributions:[]});
const connectionRows=`
euclid-elements|non-euclidean|Revised|Later geometries reconsidered the constraints of Euclidean space.|riemann
euclid-elements|earth-size|Context|Geometrical reasoning connects these episodes; this link does not assert that Eratosthenes used this particular text.|eratosthenes
liu-commentary|zu-pi|Context|Compare two stages in Chinese mathematical work on pi, without assuming a documented personal relationship.|zu
aryabhatiya|zero|Context|These works show different stages of Indian mathematics; a chronological link alone does not establish direct borrowing.|brahmagupta
zero|bhaskara-siddhanta|Built on|Bhaskara developed the Indian mathematical tradition that included Brahmagupta’s arithmetic and algebra.|bhaskara
algebra|fibonacci-numerals|Context|Arabic mathematical scholarship was part of the wider transmission of calculation methods to Latin readers.|fibonacci
kerala-series|calculus|Context|Both concern infinite processes, but a direct transmission from Kerala to European calculus is not established here.|madhava
ptolemy-model|heliocentric|Revised|Copernicus reorganized planetary astronomy around a moving Earth.|planetary
ptolemy-model|tusi-couple|Revised|The Tusi couple belonged to attempts to reform mathematical models within the geocentric tradition.|tusi
kashi-pi|samarkand|Collaboration|Al Kashi’s mathematical work formed part of the scholarly community at the Samarkand observatory.|kashi
heliocentric|ellipses|Revised|Kepler replaced circular planetary paths with ellipses using Brahe’s observations.|keplerLaws
heliocentric|jupiter|Evidence|Moons orbiting Jupiter challenged the claim that all celestial motions must centre on Earth.|planetary
ellipses|planet-laws|Extended|Kepler’s third law supplemented his earlier laws with a relation between orbital period and size.|keplerLaws
planet-laws|gravity|Explained|Newton’s dynamics and gravitation explained important regularities described by Kepler.|newton
motion|gravity|Built on|Galileo’s work on motion was part of the mechanics Newton unified.|newton
analytic-geometry|calculus|Background|Using equations to describe curves provided part of the mathematical setting for calculus.|leibniz
calculus|gravity|Background|Mathematics of changing quantities connects these developments. The Principia often presented arguments geometrically.|newton
gravity|general-relativity|Revised|General relativity replaced universal instantaneous attraction with a spacetime account, recovering Newtonian results in suitable limits.|relativity
non-euclidean|general-relativity|Enabled|Geometry of curved spaces supplied mathematical tools for relativistic gravitation.|riemann
general-relativity|noether-symmetry|Context|Noether’s theorem grew in a mathematical setting concerned with invariance and conservation, including questions raised by gravitation.|noether
oxygen|combustion|Evidence|Experiments on oxygen helped Lavoisier construct a new interpretation of combustion.|lavoisier
combustion|chemistry-elements|Extended|Lavoisier’s textbook systematized the new chemical account and its terminology.|lavoisier
chemistry-elements|atomic-theory|Background|Quantitative chemistry created the setting in which atomic proportions could be investigated.|dalton
atomic-theory|avogadro|Extended|Avogadro’s molecular hypothesis helped distinguish the particles of elements from molecules of gases.|periodic
atomic-theory|periodic-table|Background|Atomic weights and chemical properties were important inputs to periodic classification.|periodic
periodic-table|atomic-number|Revised|Moseley showed why nuclear charge, rather than atomic weight alone, orders the elements.|periodic
battery|electrolysis|Enabled|Sustained current made Davy’s electrochemical isolation experiments possible.|davy
battery|oersted|Enabled|A sustained electric circuit supplied the current whose magnetic effect Ørsted investigated.|electric
oersted|ampere|Built on|Ampère investigated forces between currents after learning of Ørsted’s result.|electric
ampere|fields|Background|Quantitative laws of current and magnetism became part of the electromagnetic framework.|milestone-fields
interference|fields|Context|Wave accounts of light and Maxwell’s electromagnetic account can be compared here; the link does not name a single causal source.|milestone-fields
fields|special-relativity|Background|Reconciling electromagnetism with the description of motion was central to special relativity.|relativity
michelson|special-relativity|Context|The ether experiment and relativity address related problems. Einstein’s exact dependence on this experiment is historically nuanced.|relativity
heat-engine|second-law|Built on|Clausius and Kelvin reformulated thermodynamics after Carnot’s analysis of heat engines.|climate
energy|second-law|Background|The relation between heat and work constrained the developing theory of thermodynamics.|climate
second-law|statistical-mechanics|Explained|Statistical mechanics provided a molecular account of thermodynamic behaviour.|climate
statistical-mechanics|brownian|Background|Molecular statistics made random microscopic motion quantitatively intelligible.|dalton
atmosphere|infrared-gases|Extended|Laboratory studies of gases advanced the earlier idea that the atmosphere affects Earth’s temperature.|climate
infrared-gases|co2-warming|Built on|Gas absorption research contributed to quantitative estimates of carbon dioxide warming.|climateco2
co2-warming|keeling-curve|Context|The warming calculation and the measured rise of atmospheric CO₂ are complementary strands of climate science.|climateco2
co2-warming|climate-models|Extended|Later atmospheric models used more complete treatments of radiation and energy balance.|climatemodel
keeling-curve|climate-models|Evidence|Atmospheric measurements provide observational context for modelling changing greenhouse gas concentrations.|climateco2
deep-time|geology-principles|Extended|Lyell developed the geological emphasis on observable processes acting over long periods.|geology
geology-principles|evolution|Influence|Deep geological time was important to Darwin’s thinking about biological change.|geology
continental-drift|seafloor|Extended|Seafloor research supplied a new account of motion that Wegener’s original proposal lacked.|plates
seafloor|magnetic-stripes|Evidence|Magnetic patterns provided a test of seafloor spreading.|plates
magnetic-stripes|plate-tectonics|Evidence|Paired magnetic anomalies supported spreading and the emerging plate framework.|plates
transform-faults|plate-tectonics|Built on|Transform faults helped explain relative motion between rigid plates.|wilson
cells|cell-theory|Extended|Early microscopic observations preceded the generalization of cellular organization.|genomes
cell-theory|cell-division|Revised|Evidence for cell division corrected older accounts of how cells arise.|genomes
microbes|germ-proof|Background|Seeing microorganisms opened an experimental realm later linked to disease.|medicine
hygiene|germ-proof|Context|Handwashing reduced disease before a broadly accepted microbial explanation; this link is retrospective context.|medicine
cholera|germ-proof|Context|Public health evidence and laboratory microbiology supplied different approaches to understanding infection.|medicine
germ-proof|rabies|Enabled|Microbiological research informed Pasteur’s team’s vaccine development.|medicine
vaccination|rabies|Extended|Rabies research extended the practice of inducing protection against disease.|medicine
penicillin-observed|penicillin-treatment|Developed|The Oxford team transformed Fleming’s observation into material suitable for therapeutic testing.|penicillin
penicillin-treatment|protein-crystal|Extended|Solving penicillin’s molecular structure added a structural account to the therapeutic development.|hodgkin
mendel|chromosome|Explained|Chromosome behaviour offered a cellular basis for Mendelian inheritance.|genomes
dna-isolated|dna-transform|Extended|The substance isolated as nuclein was later identified as the transforming genetic material.|avery
transformation|dna-transform|Explained|Avery, MacLeod and McCarty identified the chemical agent in bacterial transformation as DNA.|avery
dna-transform|dna-virus|Evidence|Independent viral experiments strengthened the case for DNA’s genetic role.|hershey
dna-virus|helix|Background|Evidence that DNA carries genes sharpened the significance of solving its molecular structure.|dna
xray|xray-crystals|Enabled|X rays became a probe of the atomic arrangement in crystals.|crystal
xray-crystals|photo|Enabled|Diffraction methods made the structural investigation of DNA possible.|photo
xray-crystals|protein-crystal|Enabled|Crystallography supplied the method used to determine penicillin’s structure.|hodgkin
xray-crystals|myoglobin|Enabled|Protein crystallography extended diffraction methods to larger biological molecules.|proteinshape
helix|mrna|Background|The genetic role and structure of DNA framed the question of how information reaches protein synthesis.|genomes
mrna|first-codon|Background|Messenger RNA research and coding experiments connected nucleotide sequences with protein synthesis.|geneticcode
first-codon|genetic-code|Extended|Deciphering the first codon was followed by systematic work to resolve the remaining code.|geneticcode
helix|sanger-dna|Background|The molecular understanding of DNA underpinned methods for reading its sequence.|sangerdna
restriction-enzymes|recombinant|Enabled|Sequence specific DNA cutting made it possible to construct new DNA combinations.|engineeringdna
sanger-dna|human-genome|Enabled|DNA sequencing methods were essential tools for the Human Genome Project.|hgp
pcr|neanderthal-genome|Background|DNA amplification helped open ancient DNA research, alongside later sequencing and contamination control advances.|ancientdna
human-genome|complete-genome|Extended|The gapless assembly resolved many difficult regions missing from earlier human references.|completeGenome
recombinant|crispr-editing|Context|Compare earlier DNA engineering with programmable RNA guided cutting. The technologies are not a single direct invention chain.|crisprpaper
mrna|mrna-modified|Extended|Understanding messenger RNA preceded efforts to make introduced RNA better tolerated by cells.|mrna
mrna-modified|mrna-vaccine|Enabled|Nucleoside modification research was one foundation of successful mRNA vaccines, alongside delivery and clinical development.|mrna
insulin-sequence|protein-ai|Background|Protein structure prediction takes amino acid sequence as a central input.|protein
myoglobin|protein-ai|Background|Experimentally solved protein structures supplied knowledge and data for later prediction methods.|protein
backprop|alexnet|Built on|AlexNet trained a deep neural network through gradient based learning, with data and GPU computation.|deeplearn
alexnet|transformers|Context|Both are major neural network milestones, but the Transformer was not a direct extension of AlexNet’s convolutional architecture.|transformer
transformers|protein-ai|Context|Attention mechanisms also appear in protein prediction systems; AlphaFold2 is not simply a language Transformer.|protein
analytical-engine|ada-notes|Built on|Lovelace’s notes examined the capabilities and possible uses of Babbage’s proposed engine.|babbage
boolean|information|Background|Shannon’s earlier work connected Boolean algebra with switching circuits, a foundation for digital information systems.|shannonLogic
turing-machine|stored-program|Background|The mathematical study of general computation forms part of the broader background of programmable computers.|computing
transistor-point|integrated-circuit|Enabled|Integrated circuits brought multiple electronic elements onto a single chip.|chip
integrated-circuit|alexnet|Background|Semiconductor integration enabled the computing hardware used much later for large neural networks.|deeplearn
quanta|matter-waves|Background|Quantum descriptions of radiation formed part of the setting for de Broglie’s wave proposal.|debroglie
photon|compton-effect|Evidence|Compton scattering supplied evidence for the energy and momentum of light quanta.|compton
matter-waves|wave-equation|Built on|Schrödinger developed a dynamical wave theory after de Broglie’s matter wave proposal.|schrodinger
matter-waves|electron-diffraction|Tested|Electron diffraction experiments tested the wave behaviour predicted for matter.|electron-diff
atom|matrix-mechanics|Revised|The new quantum mechanics replaced the earlier orbital model with a different mathematical description.|heisenberg
wave-equation|probability-wave|Interpreted|Born supplied a probability interpretation of the quantum wavefunction.|born
matrix-mechanics|uncertainty|Extended|Heisenberg developed uncertainty relations within quantum mechanics.|heisenberg
wave-equation|dirac-electron|Extended|Dirac developed a relativistic quantum equation for electrons.|dirac
special-relativity|dirac-electron|Built on|Relativistic consistency was a central requirement of Dirac’s electron theory.|dirac
dirac-electron|positron|Evidence|The positron provided experimental evidence for the antimatter emerging from relativistic quantum theory.|anderson
dirac-electron|quantum-electrodynamics|Extended|Quantum electrodynamics developed the relativistic theory of interactions between charged particles and light.|qed
superconductivity|bcs-theory|Explained|BCS theory supplied a microscopic account of conventional superconductivity.|bcs
exclusion|periodic-table|Explained|The exclusion principle helps explain electronic structure and periodic chemical behaviour; the explanatory arrow runs back to an older observation.|pauli
neutron|neutron-irradiation|Enabled|Identifying neutrons enabled their use as probes of atomic nuclei.|fermi
neutron-irradiation|fission|Background|Neutron bombardment experiments set the stage for the chemical evidence of uranium splitting.|fissionpaper
fission|chain-reaction|Enabled|Fission can release neutrons that sustain further fission in a suitable assembly.|fermi-reactor
chain-reaction|neutrino-detect|Enabled|A nuclear reactor supplied an intense antineutrino source for the detection experiment.|neutrino
neutron|shell-model|Background|A nucleus composed of protons and neutrons was the basis for the later shell model.|shell
higgs-mechanism|higgs-detected|Tested|The ATLAS and CMS observations tested a particle prediction of the symmetry breaking mechanism.|higgs
cepheids|other-galaxies|Enabled|Leavitt’s period relation supplied a basis for measuring distances to Cepheid stars in Andromeda.|leavitt
other-galaxies|redshift-distance|Enabled|Extragalactic distance estimates allowed comparison with measured recession velocities.|hubble
general-relativity|expanding-model|Built on|Friedmann and Lemaître explored expanding solutions in relativistic cosmology.|cosmos
expanding-model|redshift-distance|Evidence|The observed distance and recession relation supported an expanding universe, rather than proving one theory in isolation.|cosmos
expanding-model|cosmic-background|Evidence|The microwave background supported a hot early universe within expanding cosmology.|cmb
redshift-distance|accelerating-universe|Extended|Supernova distance measurements extended the study of cosmic expansion and revealed acceleration.|darkenergy
general-relativity|gravity-waves|Tested|LIGO directly detected a type of spacetime disturbance predicted by general relativity.|ligo
general-relativity|blackhole-image|Tested|The observed shadow offered a new test of strong gravity around a massive black hole.|blackhole
general-relativity|gps|Applied|Precise satellite navigation must account for relativistic clock effects.|milestone-gps
battery|lithium-ion|Context|Compare early electrochemical current sources with modern rechargeable battery chemistry.|lithium
insulin-discovery|insulin-sequence|Extended|After insulin became a treatment, its chemical sequence became a landmark problem in protein chemistry.|sangerprotein
enzyme-fermentation|catalytic-rna|Revised|Biochemical catalysis was later shown to include RNA as well as protein enzymes.|catalyticrna
neuron-doctrine|nerve-signals|Extended|The electrical study of individual nerve cells extended the cellular view of nervous tissue.|nerve
neuron-doctrine|grid-cells|Extended|Identifying discrete nerve cells enabled later questions about how particular cells encode spatial information.|braincells
malaria-mosquito|artemisinin|Context|Understanding transmission and developing treatments are complementary responses to malaria.|artemisinin
`;
for(const row of connectionRows.trim().split('\n')) discoveryEdges.push(row.split('|'));
const peopleRows=`
sommerfeld|heisenberg|Mentorship|Heisenberg studied under Sommerfeld in Munich and completed his doctorate there.|heisenbergBio
sommerfeld|pauli|Mentorship|Pauli studied at Munich under Sommerfeld before completing his doctorate in 1921.|pauliBio
born|heisenberg|Mentorship|Heisenberg worked as Born’s assistant in Göttingen during the development of quantum mechanics.|heisenbergBio
bohr|heisenberg|Mentorship|Heisenberg worked with Bohr in Copenhagen; this was research guidance, not his doctorate.|heisenbergBio
blackburn|greider|Mentorship|Greider was Blackburn’s doctoral student at Berkeley when they discovered telomerase.|greiderBio
mayor|queloz|Mentorship|Queloz was Mayor’s doctoral student when they discovered 51 Pegasi b.|mayorBio
schwinger|glashow|Mentorship|Glashow names Schwinger as his doctoral thesis supervisor.|glashowBio
raman|sarabhai|Mentorship|Sarabhai conducted postgraduate cosmic ray research under Raman’s supervision at IISc from 1940.|indiaspace
brahe|kepler|Mentorship|Kepler worked as Brahe’s assistant; Brahe’s observations were central to Kepler’s planetary research.|keplerLaws
kepler|newton|Influence|Newton’s gravitational theory explained the regularities of Kepler’s planetary laws. This is intellectual influence, not personal mentorship.|newton
babbage|ada|Collaboration|Lovelace studied and explained Babbage’s proposed Analytical Engine and explored its possibilities.|babbage
ramanujan|hardy|Collaboration|Ramanujan and Hardy collaborated on mathematical research, including the partition formula.|ramanujan
darwin|wallace|Collaboration|Their independently developed accounts of natural selection were jointly presented in 1858. This does not imply that all their research was jointly conducted.|genomes
lavoisier|marieanne|Collaboration|Marie Anne contributed translation, illustration and laboratory records to their chemical work.|lavoisier
hahn|strassmann|Collaboration|Their chemical experiments identified products that led to the interpretation of uranium fission.|fissionchem
meitner|frisch|Collaboration|They jointly interpreted the splitting of uranium nuclei and published a physical account of fission.|fissionpaper
hahn|meitner|Evidence|The chemical result informed Meitner and Frisch’s interpretation of nuclear fission.|fissionpaper
heisenberg|born|Collaboration|Born and Heisenberg, with Jordan, developed the matrix formulation of quantum mechanics.|heisenbergBio
born|jordan|Collaboration|Born and Jordan worked on the mathematical formulation of quantum mechanics.|born
raman|krishnan|Collaboration|Their experimental investigations established the frequency shifted scattering of light.|raman
bardeen|brattain|Collaboration|Bardeen and Brattain produced the point contact transistor at Bell Labs.|transistor
bardeen|cooper|Collaboration|Bardeen, Cooper and Schrieffer developed the BCS account of superconductivity.|bcs
cooper|schrieffer|Collaboration|The BCS theory joined paired electrons with a collective quantum description.|bcs
florey|chain|Collaboration|They worked in the Oxford team developing penicillin for therapeutic use.|penicillin
chain|heatley|Collaboration|Biochemical investigation and practical extraction methods helped make penicillin usable.|penicillin
fleming|florey|Influence|Fleming’s antibacterial observation preceded the Oxford team’s therapeutic development.|penicillin
leavitt|hubble|Influence|The Cepheid period relation helped Hubble estimate distances beyond the Milky Way.|leavitt
kariko|weissman|Collaboration|They investigated how modified RNA can reduce unwanted immune activation.|mrna
doudna|charpentier|Collaboration|Their teams developed programmable CRISPR Cas9 cutting with colleagues including Jinek.|crisprpaper
doudna|jinek|Collaboration|Jinek was a coauthor of the 2012 programmable Cas9 study.|crisprpaper
hinton|krizhevsky|Collaboration|Krizhevsky, Sutskever and Hinton coauthored the AlexNet image recognition paper.|deeplearn
krizhevsky|sutskever|Collaboration|They coauthored the deep convolutional network paper with Hinton.|deeplearn
rumelhart|hinton|Collaboration|They coauthored the 1986 backpropagation paper with Williams.|backprop
hassabis|jumper|Collaboration|They contributed to the AlphaFold programme for predicting protein structures.|protein
geim|novoselov|Collaboration|They investigated atomically thin carbon layers and graphene’s properties.|graphene
maymoser|edmoser|Collaboration|Their research teams discovered grid cells involved in spatial representation.|braincells
brenner|jacob|Collaboration|They worked with Meselson in experiments identifying a messenger between genes and protein synthesis.|genomes
hershey|chase|Collaboration|They used labelled components of viruses to investigate the material entering infected bacteria.|hershey
avery|macLeod|Collaboration|Their team identified DNA as the material responsible for bacterial transformation.|avery
macLeod|mccarty|Collaboration|They worked with Avery on the chemical identity of the transforming material.|avery
penzias|wilsonastro|Collaboration|They detected the microwave background radiation with a radio antenna.|cmb
banting|best|Collaboration|They worked on pancreatic extracts in the Toronto insulin programme.|insulin
greider|szostak|Context|Their discoveries belong to the telomere story; sharing a Nobel Prize alone does not establish direct collaboration.|greider
`;
for(const row of peopleRows.trim().split('\n'))peopleEdges.push(row.split('|'));
// Normalize metadata after all records have been added.
for(const p of people){p.contributions=discoveries.filter(d=>d.people.includes(p.id)).map(d=>d.id);p.fields=[...new Set([p.field,...p.contributions.map(id=>discoveries.find(d=>d.id===id).field)])];p.year??=Math.min(...p.contributions.map(id=>discoveries.find(d=>d.id===id).year));p.location??=discoveries.find(d=>d.people.includes(p.id))?.location||'Not specified';}
const newStories=[
['From Earth centred skies to spacetime','ASTRONOMY','Watch observations revise planetary models, then transform gravity.',['ptolemy-model','heliocentric','ellipses','planet-laws','gravity','general-relativity','gravity-waves']],
['Reading, writing and editing life','GENETICS','Follow the evidence for DNA and the tools used to read and change it.',['dna-isolated','transformation','dna-transform','photo','helix','sanger-dna','human-genome','crispr-editing','complete-genome']],
['The long road to artificial intelligence','COMPUTING','Explore different strands of computing. These milestones are a guided comparison, not one uninterrupted causal chain.',['analytical-engine','ada-notes','turing-machine','transistor-point','integrated-circuit','backprop','alexnet','transformers','protein-ai']],
['How we learned the climate could change','CLIMATE','From atmospheric warmth to gas experiments, measurements and models.',['atmosphere','infrared-gases','co2-warming','keeling-curve','climate-models']],
['Continents in motion','EARTH SCIENCE','A contested proposal becomes a framework through evidence from the seafloor.',['deep-time','continental-drift','seafloor','magnetic-stripes','transform-faults','plate-tectonics']],
['Mathematics across civilizations','MATHEMATICS','Visit mathematical traditions across Egypt, China, India, the Islamic world and Europe. Connections are not all direct transmissions.',['rhind','liu-commentary','aryabhatiya','zero','algebra','fibonacci-numerals','kerala-series','calculus']],
['From mould to medicine','MEDICINE','An observation needed chemistry, engineering and testing to become a treatment.',['penicillin-observed','penicillin-treatment','protein-crystal']],
['The quantum revolution','QUANTUM','Energy packets lead into wave behaviour, new mathematics and antimatter.',['quanta','photon','matter-waves','matrix-mechanics','wave-equation','dirac-electron','positron']]
];
for(const [title,tag,description,ids] of newStories)stories.push({title,tag,description,ids});
