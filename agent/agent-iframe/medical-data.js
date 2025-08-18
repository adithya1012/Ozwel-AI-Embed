// Medical Data Manager - Standalone version
// Manages patient medical data, medications, allergies, and context

export class MedicalDataManager {
    constructor() {
        this.patientData = {
            patientInfo: {
                name: "Demo Patient",
                age: 45,
                patientId: "PAT-001",
                mrn: "MRN123456"
            },
            medications: [
                {
                    id: "med-001",
                    name: "Lisinopril",
                    dose: "10mg",
                    frequency: "once daily",
                    indication: "Hypertension",
                    startDate: "2024-01-15",
                    prescriber: "Dr. Smith",
                    status: "active"
                },
                {
                    id: "med-002", 
                    name: "Metformin",
                    dose: "500mg",
                    frequency: "twice daily",
                    indication: "Type 2 Diabetes",
                    startDate: "2024-02-01",
                    prescriber: "Dr. Johnson",
                    status: "active"
                }
            ],
            allergies: [
                {
                    id: "allergy-001",
                    allergen: "Penicillin",
                    reaction: "Rash",
                    severity: "Moderate",
                    dateRecorded: "2024-01-10"
                }
            ],
            conditions: [
                {
                    id: "cond-001",
                    name: "Essential Hypertension",
                    icd10: "I10",
                    status: "active",
                    diagnosisDate: "2024-01-15"
                },
                {
                    id: "cond-002",
                    name: "Type 2 Diabetes Mellitus",
                    icd10: "E11.9",
                    status: "active", 
                    diagnosisDate: "2024-02-01"
                }
            ],
            vitals: {
                lastRecorded: "2024-08-18",
                bloodPressure: "130/85",
                heartRate: 72,
                temperature: 98.6,
                respiratoryRate: 16,
                oxygenSaturation: 98
            }
        };
        
        this.lastUpdated = new Date().toISOString();
        this.initializeFromStorage();
    }

    // Initialize data from localStorage if available
    initializeFromStorage() {
        try {
            const storedData = localStorage.getItem('medicalData');
            if (storedData) {
                const parsed = JSON.parse(storedData);
                this.patientData = { ...this.patientData, ...parsed };
                console.log('Medical data loaded from storage');
            }
        } catch (error) {
            console.warn('Could not load medical data from storage:', error);
        }
    }

    // Save data to localStorage
    saveToStorage() {
        try {
            localStorage.setItem('medicalData', JSON.stringify(this.patientData));
            this.lastUpdated = new Date().toISOString();
        } catch (error) {
            console.warn('Could not save medical data to storage:', error);
        }
    }

    // Get complete patient context
    getContext() {
        return {
            patientInfo: this.patientData.patientInfo,
            medications: this.patientData.medications.filter(med => med.status === 'active'),
            allergies: this.patientData.allergies,
            conditions: this.patientData.conditions.filter(cond => cond.status === 'active'),
            vitals: this.patientData.vitals,
            totalMedications: this.patientData.medications.filter(med => med.status === 'active').length,
            totalAllergies: this.patientData.allergies.length,
            totalConditions: this.patientData.conditions.filter(cond => cond.status === 'active').length,
            lastUpdated: this.lastUpdated
        };
    }

    // Add a new medication
    addMedication(medicationData) {
        try {
            const newMedication = {
                id: this.generateId('med'),
                name: medicationData.name,
                dose: medicationData.dose || '',
                frequency: medicationData.frequency || '',
                indication: medicationData.indication || '',
                startDate: medicationData.startDate || new Date().toISOString().split('T')[0],
                prescriber: medicationData.prescriber || 'System',
                status: 'active',
                dateAdded: new Date().toISOString()
            };

            // Check for potential duplicates
            const existingMed = this.patientData.medications.find(med => 
                med.name.toLowerCase() === newMedication.name.toLowerCase() && 
                med.status === 'active'
            );

            if (existingMed) {
                throw new Error(`Patient is already on ${newMedication.name}. Consider updating the existing medication instead.`);
            }

            // Check for allergies
            const allergyCheck = this.checkAllergies(newMedication.name);
            if (allergyCheck.hasAllergy) {
                console.warn(`ALLERGY WARNING: Patient allergic to ${allergyCheck.allergen}`);
                // Still allow but with warning
            }

            this.patientData.medications.push(newMedication);
            this.saveToStorage();

            return {
                success: true,
                medication: newMedication,
                message: `Successfully added ${newMedication.name} ${newMedication.dose} ${newMedication.frequency}`,
                warnings: allergyCheck.hasAllergy ? [`ALLERGY WARNING: Patient allergic to ${allergyCheck.allergen}`] : []
            };

        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Discontinue a medication
    discontinueMedication(medId) {
        try {
            // Try to find by ID first, then by name
            let medication = this.patientData.medications.find(med => 
                med.id === medId && med.status === 'active'
            );

            if (!medication) {
                // Try to find by medication name (case insensitive)
                medication = this.patientData.medications.find(med => 
                    med.name.toLowerCase() === medId.toLowerCase() && med.status === 'active'
                );
            }

            if (!medication) {
                throw new Error(`Medication '${medId}' not found or already discontinued`);
            }

            medication.status = 'discontinued';
            medication.discontinueDate = new Date().toISOString().split('T')[0];
            medication.discontinueReason = 'Discontinued via AI Assistant';

            this.saveToStorage();

            return {
                success: true,
                medication: {
                    id: medication.id,
                    name: medication.name,
                    dose: medication.dose,
                    frequency: medication.frequency
                },
                message: `Successfully discontinued ${medication.name}`
            };

        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Add a new allergy
    addAllergy(allergyData) {
        try {
            const newAllergy = {
                id: this.generateId('allergy'),
                allergen: allergyData.allergen,
                reaction: allergyData.reaction || 'Unknown reaction',
                severity: allergyData.severity || 'Moderate',
                dateRecorded: new Date().toISOString().split('T')[0],
                recordedBy: 'AI Assistant'
            };

            // Check for duplicates
            const existingAllergy = this.patientData.allergies.find(allergy => 
                allergy.allergen.toLowerCase() === newAllergy.allergen.toLowerCase()
            );

            if (existingAllergy) {
                throw new Error(`Allergy to ${newAllergy.allergen} is already recorded`);
            }

            this.patientData.allergies.push(newAllergy);
            this.saveToStorage();

            // Check current medications for potential conflicts
            const conflicts = this.checkMedicationAllergies(newAllergy.allergen);

            return {
                success: true,
                allergy: newAllergy,
                message: `Successfully added allergy to ${newAllergy.allergen}`,
                warnings: conflicts.length > 0 ? 
                    [`WARNING: Patient currently taking medications that may conflict: ${conflicts.join(', ')}`] : []
            };

        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Check for allergies against a medication
    checkAllergies(medicationName) {
        const med = medicationName.toLowerCase();
        
        for (const allergy of this.patientData.allergies) {
            const allergen = allergy.allergen.toLowerCase();
            
            // Direct match
            if (med.includes(allergen) || allergen.includes(med)) {
                return {
                    hasAllergy: true,
                    allergen: allergy.allergen,
                    reaction: allergy.reaction,
                    severity: allergy.severity
                };
            }
            
            // Check for common drug class allergies
            if (this.checkDrugClassAllergy(med, allergen)) {
                return {
                    hasAllergy: true,
                    allergen: allergy.allergen,
                    reaction: allergy.reaction,
                    severity: allergy.severity
                };
            }
        }
        
        return { hasAllergy: false };
    }

    // Check for drug class allergies (basic implementation)
    checkDrugClassAllergy(medication, allergen) {
        const drugClasses = {
            'penicillin': ['amoxicillin', 'ampicillin', 'penicillin'],
            'sulfa': ['sulfamethoxazole', 'sulfasalazine'],
            'nsaid': ['ibuprofen', 'naproxen', 'aspirin', 'celecoxib']
        };

        for (const [classType, drugs] of Object.entries(drugClasses)) {
            if (allergen.includes(classType)) {
                return drugs.some(drug => medication.includes(drug));
            }
        }
        
        return false;
    }

    // Check current medications for allergy conflicts
    checkMedicationAllergies(newAllergen) {
        const conflicts = [];
        const activeMeds = this.patientData.medications.filter(med => med.status === 'active');
        
        for (const med of activeMeds) {
            const allergyCheck = this.checkAllergies(med.name);
            if (allergyCheck.hasAllergy && allergyCheck.allergen.toLowerCase() === newAllergen.toLowerCase()) {
                conflicts.push(med.name);
            }
        }
        
        return conflicts;
    }

    // Generate unique IDs
    generateId(prefix) {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `${prefix}-${timestamp}-${random}`;
    }

    // Get medication by ID or name
    getMedication(identifier) {
        return this.patientData.medications.find(med => 
            med.id === identifier || 
            med.name.toLowerCase() === identifier.toLowerCase()
        );
    }

    // Get allergy by ID or allergen name
    getAllergy(identifier) {
        return this.patientData.allergies.find(allergy => 
            allergy.id === identifier || 
            allergy.allergen.toLowerCase() === identifier.toLowerCase()
        );
    }

    // Update patient information
    updatePatientInfo(updates) {
        try {
            this.patientData.patientInfo = { ...this.patientData.patientInfo, ...updates };
            this.saveToStorage();
            
            return {
                success: true,
                patientInfo: this.patientData.patientInfo,
                message: 'Patient information updated successfully'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Add vital signs
    updateVitals(vitalsData) {
        try {
            this.patientData.vitals = {
                ...this.patientData.vitals,
                ...vitalsData,
                lastRecorded: new Date().toISOString().split('T')[0]
            };
            this.saveToStorage();
            
            return {
                success: true,
                vitals: this.patientData.vitals,
                message: 'Vital signs updated successfully'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Export data for backup or transfer
    exportData() {
        return {
            exportDate: new Date().toISOString(),
            patientData: this.patientData,
            lastUpdated: this.lastUpdated
        };
    }

    // Import data from backup
    importData(importedData) {
        try {
            if (importedData.patientData) {
                this.patientData = importedData.patientData;
                this.saveToStorage();
                return {
                    success: true,
                    message: 'Data imported successfully'
                };
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Reset to demo data
    resetToDemo() {
        localStorage.removeItem('medicalData');
        this.constructor();
        return {
            success: true,
            message: 'Data reset to demo state'
        };
    }
}
