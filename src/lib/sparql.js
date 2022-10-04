import { ACUTE_TOXICITY, MUTAGENICITY, REPEATED_DOSE_TOXICITY, CHEMICAL_IDENTITY, SKIN_SENSITISATION_UNMERGED, CARCINOGENICIY } from "./endpoint_constants"

// ont:administration_scheme  
// ont:chemical_batch_nr      
// ont:conclusion             
// ont:glp                    
// ont:n_animals_group        
// ont:observation_period     
// ont:observations           
// ont:oral                   
// ont:purity                 
// ont:ref_in_dossier         
// ont:species_strain        
// ont:study_duration        
// ont:type                  
// ont:vehicle               
// ont:year                  

const carcinogenicityQuery = `
		PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
		PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		PREFIX ont: <http://ontologies.vub.be/oecd#>

		SELECT DISTINCT *
		WHERE {
			?test a ont:Test .
			?test ont:compound ?compound .
			?compound rdfs:label ?compoundLabel .
			#// ?test ont:oecd_test_nr ?guideline .

			OPTIONAL { ?test ont:chemical_batch_nr ?chemical_batch_nr .  }
			OPTIONAL { ?test ont:chemical_batch_nr ?chemical_batch_nr .  }
			OPTIONAL { ?test ont:conclusion ?conclusion .  }
			OPTIONAL { ?test ont:glp ?glp .}
			OPTIONAL { ?test ont:n_animals_group ?n_animals_group .  }
			OPTIONAL { ?test ont:oecd ?observation_period .  }
			OPTIONAL { ?test ont:observations ?observations .  }
			OPTIONAL { ?test ont:oral ?oral .  }
			OPTIONAL { ?test ont:purity ?purity .  }
			OPTIONAL { ?test ont:ref_in_dossier ?ref_in_dossier .  }
			OPTIONAL { ?test ont:species_strain ?species_strain .  }
			OPTIONAL { ?test ont:study_duration ?study_duration .  }
			OPTIONAL { ?test ont:type ?type .  }
			OPTIONAL { ?test ont:vehicle ?vehicle .  }
			OPTIONAL { ?test ont:year ?year .  }
		}
`

export const repeatedDoseToxicityQuery = ` 
		PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
		PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		PREFIX ont: <http://ontologies.vub.be/oecd#>

		SELECT DISTINCT *
		WHERE {
			?test a ont:Test .
			?test ont:compound ?compound .
			?compound rdfs:label ?compoundLabel .
			?test rdf:type ?type .
			?test ont:guideline ?guideline .

		# 	const test_endpoints_keys = [
		#     'target_organ',
		#     'observations',
		#     'dose_descriptor',
		#     'moribund_or_dead_animals_prior_to_study_termination',
		#     'mortality_rate',
		#     'conclusion'
		# ];

			OPTIONAL { ?test ont:target_organ ?target_organ .  }
			OPTIONAL { ?test ont:observations ?observations .  }
			OPTIONAL { ?test ont:dose_descriptor ?dose_descriptor .  }
			OPTIONAL { ?test ont:moribound_or_dead_animals_prior_to_study_termination ?moribound_or_dead_animals_prior_to_study_termination .  }
			OPTIONAL { ?test ont:mortality_rate ?mortality_rate .  }
			OPTIONAL { ?test ont:conclusion ?conclusion .  }

		# const test_conditions_keys = [
		#     'dose_levels',
		#     'dose_level_unit',
		#     'dose_volume',
		#     'rinsing_procedure',
		#     'vehicle_concentration',
		#     'exposure_time',
		#     'observation_period'
		# ]

			OPTIONAL { ?test ont:dose_levels ?dose_levels .  }
			OPTIONAL { ?test ont:dose_level_unit ?dose_level_unit .  }
			OPTIONAL { ?test ont:dose_volume ?dose_volume .  }
			OPTIONAL { ?test ont:rinsing_procedure ?rinsing_procedure .  }
			OPTIONAL { ?test ont:vehicle_concentration ?vehicle_concentration .  }
			OPTIONAL { ?test ont:exposure_time ?exposure_time .  }
			OPTIONAL { ?test ont:observation_period ?observation_period .  }

		# const test_substance_keys = [
		#     'homogeneity_and_stability',
		#     'treatment_prior_to_application',
		#     'physical_form',
		#     'concentration',
		#     'composition',
		#     'purity',
		#     'solubility_in_vehicle',
		#     'chemical_batch_nr',
		#     'particle_size',
		#     'additional_info'
		# ];

			OPTIONAL { ?test ont:homogeneity_and_stability ?homogeneity_and_stability .  }
			OPTIONAL { ?test ont:treatment_prior_to_application ?treatment_prior_to_application .  }
			OPTIONAL { ?test ont:physical_form ?physical_form .  }
			OPTIONAL { ?test ont:concentration ?concentration .  }
			OPTIONAL { ?test ont:composition ?composition .  }
			OPTIONAL { ?test ont:purity ?purity .  }
			OPTIONAL { ?test ont:solubility_in_vehicle ?solubility_in_vehicle .  }
			OPTIONAL { ?test ont:chemical_batch_nr ?chemical_batch_nr .  }
			OPTIONAL { ?test ont:particle_size ?particle_size .  }
			OPTIONAL { ?test ont:additional_info ?additional_info .  }

		# const route_of_exposure_keys = [
		#     'oral',
		#     'dermal',
		#     'body_surface',
		#     'patching_technique',
		#     'skin_condition',
		#     'inhalation',
		#     'other'
		# ];

			OPTIONAL { ?test ont:oral ?oral .  }
			OPTIONAL { ?test ont:dermal ?dermal .  }
			OPTIONAL { ?test ont:body_surface ?body_surface .  }
			OPTIONAL { ?test ont:patching_technique ?patching_technique .  }
			OPTIONAL { ?test ont:skin_condition ?skin_condition .  }
			OPTIONAL { ?test ont:inhalation ?inhalation .  }
			OPTIONAL { ?test ont:other ?other .  }

		# const test_species_keys = [
		#     'species',
		#     'source',
		#     'age_at_start_of_experiment',
		#     'age_measuring_unit',
		#     'sex',
		#     'weight',
		#     'weight_measuring_unit',
		#     'feed',
		#     'n_animals_dose',
		# ];

			OPTIONAL { ?test ont:species ?species.  }
			OPTIONAL { ?test ont:source ?source .  }
			OPTIONAL { ?test ont:age_at_start_of_experiment ?age_at_start_of_experiment .  }
			OPTIONAL { ?test ont:age_measuring_unit ?age_measuring_unit .  }
			OPTIONAL { ?test ont:sex ?sex .  }
			OPTIONAL { ?test ont:weight ?weight .  }
			OPTIONAL { ?test ont:weight_measuring_unit ?weight_measuring_unit .  }
			OPTIONAL { ?test ont:feed ?feed .  }
			OPTIONAL { ?test ont:n_animals_dose ?n_animals_dose .  }

		# const reliability_of_test_keys = [
		#     'scss_comment_to_test',
		#     'year',
		#     'control_groups',
		#     'glp',
		#     'klimisch_score',
		#     'Ref_in_dossier'
		# ];

			OPTIONAL { ?test ont:scss_comment_to_test ?scss_comment_to_test .  }
			OPTIONAL { ?test ont:year ?year .  }
			OPTIONAL { ?test ont:control_groups ?control_groups .  }
			OPTIONAL { ?test ont:glp ?glp .  }
			OPTIONAL { ?test ont:klimisch_score ?klimisch_score .  }
			OPTIONAL { ?test ont:ref_in_dossier ?ref_in_dossier .  }
		}	
    `


const chemicalIdentityQuery = ({ smiles, cas, inci }) => {
	const smilesStr = smiles
		? `?compound ont:SMILES "${smiles}" .`
		: '?compound ont:SMILES ?smiles .';

	const casStr = cas
		? `?compound ont:CAS_number "${cas}" .`
		: '?compound ont:CAS_number ?cas_number .';

	const inciStr = inci ? `?compound ont:INCI "${inci}" .` : '?compound ont:INCI ?inci .';

	return ` 
			PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
			PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
			PREFIX ont: <http://ontologies.vub.be/oecd#>

			SELECT DISTINCT *
			{
				?compound rdfs:label ?label .
				${smilesStr}
				?compound ont:SMILES ?smiles .
				${casStr}
				?compound ont:CAS_number ?cas_number .
				${inciStr}
				?compound ont:INCI ?inci .
				OPTIONAL { ?compound ont:EC_number ?ec_number .  }
				OPTIONAL { ?compound ont:additional_info ?additional_info .  }
				OPTIONAL { ?compound ont:empirical_formula ?empirical_formula .  }
				OPTIONAL { ?compound ont:function_and_uses ?function_and_uses .  }
				OPTIONAL { ?compound ont:homogeneity_and_stability ?homogeneity_and_stability .  }
				OPTIONAL { ?compound ont:impurity ?impurity .  }
				OPTIONAL { ?compound ont:molecularweight ?molecularweight .  }
				OPTIONAL { ?compound ont:physical_form ?physical_form .  }
				OPTIONAL { ?compound ont:primary_name  ?primary_name .  }
				OPTIONAL { ?compound ont:purity  ?purity .  }
			}
	`;
};
// rdfs:label                  "hc yellow n°9 Test (96)" ;
// ont:additional_info         "test substance: hc yellow n°9" ;
// ont:additional_information  "positive control: hca at the concentration of 25% in dmso. local lymph node assay (llna), during the induction phase, the test item, vehicle or reference item was applied over the ears (25 μL per ear) for 3 consecutive days (days 1, 2 and 3). after 2 days of resting, the proliferation of lymphocytes in the lymph node draining the application site was measured by incorporation of tritiated methyl thymidine (day 6). the obtained values were used to calculate stimulation indices (SI). the irritant potential of the test item was assessed in parallel by measurement of ear thickness on days 1, 2, 3 and 6" ;
// ont:administration_scheme   "during the induction phase, the test item, vehicle or reference item was applied over the ears (25 μL per ear) for 3 consecutive days (days 1, 2 and 3). after 2 days of resting, the proliferation of lymphocytes in the lymph node draining the application site was measured by incorporation of tritiated methyl thymidine (day 6). the obtained values were used to calculate stimulation indices (SI). the irritant potential of the test item was assessed in parallel by measurement of ear thickness on days 1, 2, 3 and 6. α-hexylcinnamaldehyde (HCA) at the concentration of 25% in DMSO has been used as positive control." ;
// ont:chemical_batch_nr       "510071" ;
// ont:compound                <http://toxin.vub.be/resource/compound/hc%20yellow%20n°9> ;
// ont:dose_levels             "0.05, 0.1, 0.25, 0.5 and 1% in dmso" ;
// ont:glp                     "yes" ;
// ont:n_animals_group         "4" ;
// ont:observations_and_recording_of_toxicity
// 		"the stimulation index was lower than 3 at all the five concentrations assayed. no dose related effect was observed. hc yellow n° 9 at concentrations up to 1% did not induce delayed contact hypersensitivity in the murine local lymph node assay. no cutaneous reactions and no noteworthy increase in ear thickness were observed in the animals of the treated groups." ;
// ont:oecd_test_nr            "OECD 429" ;
// ont:purity                  "98.5" ;
// ont:ref_in_dossier          "4 (subm. 3)" ;
// ont:sccs_comment_to_test    "the concentrations tested were too low. a sensitisation potential cannot be excluded." ;
// ont:sex                     "f" ;
// ont:species_strain          "mouse/cba/j" ;
// ont:stimulation_index       "at 0.05%: SI 1.15/ at 0.1% : SI 1.20/ at 0.25%: SI 1.12/ at 0.5%: SI 1.73/ at 1%: SI 1.12/ postive control: SI 16.02" ;
// ont:vehicle                 "dmso" ;
// ont:year                    "2005" .

const skinsensitisationUnmergedQuery = `
		PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
		PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		PREFIX ont: <http://ontologies.vub.be/oecd#>

		SELECT DISTINCT *
		WHERE {
			?test a ont:Test .
			?test ont:compound ?compound .
			?compound rdfs:label ?compoundLabel .
			?test ont:oecd_test_nr ?guideline .

			OPTIONAL { ?test ont:additional_info ?additional_info .  }
			OPTIONAL { ?test ont:administration_scheme ?administration_scheme .  }
			OPTIONAL { ?test ont:chemical_batch_nr ?chemical_batch_nr .  }
			OPTIONAL { ?test ont:dose_levels ?dose_levels .  }
			OPTIONAL { ?test ont:glp ?glp .}
			OPTIONAL { ?test ont:n_animals_group ?n_animals_group .  }
			OPTIONAL { ?test ont:observations_and_recording_of_toxicity ?observations_and_recording_of_toxicity .  }
			OPTIONAL { ?test ont:oecd_test_nr ?oecd_test_nr .  }

			OPTIONAL { ?test ont:purity ?purity .  }
			OPTIONAL { ?test ont:ref_in_dossier ?ref_in_dossier .  }
			OPTIONAL { ?test ont:sccs_comment_to_test ?sccs_comment_to_test .  }
			OPTIONAL { ?test ont:sex ?sex .  }
			OPTIONAL { ?test ont:species_strain ?species_strain .  }
			OPTIONAL { ?test ont:stimulation_index ?stimulation_index .  }
			OPTIONAL { ?test ont:vehicle ?vehicle .  }
			OPTIONAL { ?test ont:year ?year .  }
		}
`

const actuteToxicityQuery = `
		PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
		PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		PREFIX ont: <http://ontologies.vub.be/oecd#>

		SELECT DISTINCT *
		WHERE {
			?test a ont:Test .
			?test ont:compound ?compound .
			?compound rdfs:label ?compoundLabel .
			?test rdf:type ?type .
			?test ?pred ?value.
		}
`


export const getSparqlQueryString = ({ endpoint, smiles = null, cas = null, inci = null }) => {
	if (endpoint === REPEATED_DOSE_TOXICITY)
		return repeatedDoseToxicityQuery

	if (endpoint === ACUTE_TOXICITY)
		return actuteToxicityQuery
	if (endpoint === MUTAGENICITY)
		return actuteToxicityQuery
	if (endpoint === CHEMICAL_IDENTITY)
		return chemicalIdentityQuery({ smiles, cas, inci })
	if (endpoint === SKIN_SENSITISATION_UNMERGED)
		return actuteToxicityQuery
	if (endpoint === CARCINOGENICIY)
		return carcinogenicityQuery
}

// # ont:chemical_batch_nr      "110889" ;
// #// ont:compound               <http://toxin.vub.be/resource/compound/4-nitrophenyl%20aminoethylurea> ;
// #// ont:conclusion             "4-nitrophenylaminoethylurea was not genotoxic (clastogenic and/or aneugenic) in the in vivo micronucleus test using nmri mice after a single intraperitoneal administration up to 1000 mg/kg bw." ;
// #// ont:control                "negative control groups received 30% dmso / 70% corn oil (10 ml/kg bw) and concurrent positive control groups received 40 mg/kg bw cyclophosphamide (cpa) dissolved in deionised water" ;
// #// ont:dose_levels            "250, 500, 1000 mg/kg bw" ;
// #// ont:glp                    "yes" ;
// #// ont:intraperitoneal        "intraperitoneal" ;
// #// ont:moribound_or_dead_animals_prior_to_study_termination
// #//         "no" ;
// #// ont:n_animals_group        "6 (5 animals per test group were analysed)" ;
// #// ont:observations           "as in the pre-test, no substantial difference was observed in sensitivity/toxicity to the test item between sexes; in the main test only male mice were used. in the main study, toxic signs like those described in the pre-experiment were noted for the high dose group up to 24 hours after administration, but no cases of death occurred. yellow discoloured urine was noted up to 24 and 48 hours (highest dose level only) after intraperitoneal administration. 4-nitrophenylaminoethylurea showed no clear cytotoxic effect in the bone marrow as the pce/nce ratio did not substantially change after treatment with the test item up to systemically toxic doses. however, the discoloured urine and the observed systemic toxicity and the available kinetic data indicate that 4-nitrophenylaminoethylurea becomes bioavailable and systemically distributed after intraperitoneal administration. there was no statistically significant or biologically relevant increase in the number of micronuclei per 2000 pces in the mice of any of the 4-nitrophenylaminoethylurea treated groups versus the respective vehicle control groups. the positive control group (cpa) produced a statistically significant increase in micronucleated pces and the vehicle control was well within the range of historical control data of the performing laboratory." ;
// #// ont:oecd_test_nr           "OECD 474" ;
// #// ont:preliminary_study      "dose selection was based on findings in the pre-experiment for toxicity, in which a dose range of 100 to 1500 mg/kg bw was administered. bone marrow cells were sampled from mice immediately after sacrifice, 24 h or 48 h (high dose group only) after dosing. at least 2000 pces per animal were analysed. toxicity on the bone marrow was measured as the ratio between polychromatic and normochromatic erythrocytes (pce/nce ratio) for each animal. five animals per test group were evaluated. negative control groups received 30% dmso / 70% corn oil (10 ml/kg bw) and concurrent positive control groups received 40 mg/kg bw cyclophosphamide (cpa) dissolved in deionised water in the pre-experiment (2 animals per sex and dose), intraperitoneal administration of 1250 mg/kg bw and of 1500 mg/kg bw 4-nitrophenylaminoethylurea caused death within 24 hours in one male and two males, respectively. no deaths were noted in females at those doses. signs of toxic reactions were abdominal position, eyelid closure, ruffled fur, apathy, convulsion and reduced spontaneous activity. furthermore, the urine of all animals was yellow (the colour could be clearly distinguished from the normal urine colour) up to 48 hours after administration. at the 4 remaining doses, ranging from 100 to 1000 mg/kg bw, no deaths occurred after intraperitoneal administration. apart from yellow discoloured urine, no further clinical signs were noted up to 48 hours. based on these findings, doses of 250, 500 and 1000 mg/kg bw were chosen for the main study." ;
// #// ont:purity                 "98.9" ;
// #// ont:ref_in_dossier         "28" ;
// #// ont:sex                    "m" ;
// #// ont:species_strain         "mouse/strain nmri" ;
// #// ont:time_between_last_treatment_and_sacrifice
// #//         "24 after dosing and 48 hours (high dose and control only)" ;
// #// ont:vehicle                "30 % dmso/ 70 % corn oil" .

export const mutagenicityQuery = ` 
		PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
		PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		PREFIX ont: <http://ontologies.vub.be/oecd#>

		SELECT DISTINCT *
		WHERE {
			?test a ont:Test .
			?test ont:compound ?compound .
			?compound rdfs:label ?compoundLabel .
			?test rdf:type ?type .
			#?test rdf:type_of_study ?type_of_study .
			?test ont:oecd_test_nr ?guideline .

			OPTIONAL { ?test ont:conclusion ?conclusion .  }
			OPTIONAL { ?test ont:control ?control .  }
			OPTIONAL { ?test ont:dose_levels ?dose_levels .  }
			OPTIONAL { ?test ont:glp ?glp .  }
			OPTIONAL { ?test ont:intraperitoneal ?intraperitoneal .  }
			OPTIONAL { ?test ont:moribound_or_dead_animals_prior_to_study_termination ?moribound_or_dead_animals_prior_to_study_termination .  }
			OPTIONAL { ?test ont:n_animals_group ?n_animals_group .  }
			OPTIONAL { ?test ont:observations ?observations .  }
			OPTIONAL { ?test ont:preliminary_study ?preliminary_study .  }

			OPTIONAL { ?test ont:purity ?purity .  }
			OPTIONAL { ?test ont:ref_in_dossier ?ref_in_dossier .  }
			OPTIONAL { ?test ont:sex ?sex .  }
			OPTIONAL { ?test ont:species_strain ?species_strain .  }
			OPTIONAL { ?test ont:time_between_last_treatment_and_sacrifice ?time_between_last_treatment_and_sacrifice .  }
			OPTIONAL { ?test ont:vehicle ?vehicle .  }

		}
    `
export const endpointMaker = (n) => `https://wise.vub.ac.be/fuseki/${n}/sparql`;
// export const endpointMaker = (n) => `http://localhost:3030/${n}/sparql`;
export const constructQuery = ({ endpoint, cas = null, inci = null, smiles = null }) => `${endpointMaker(endpoint)}?query=${encodeURIComponent(getSparqlQueryString({ endpoint, cas, inci, smiles }))}&format=json`;

