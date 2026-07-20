import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { PharmacyControllers } from './pharmacy.controller';
import { PharmacyValidations } from './pharmacy.validation';

const router = express.Router();

router.post(
    '/drugs/create',
    auth('super-admin', 'domain-admin', 'staff'),
    validateRequest(PharmacyValidations.createDrugValidationSchema),
    PharmacyControllers.createDrug,
);
router.get(
    '/drugs',
    auth('super-admin', 'domain-admin', 'staff'),
    PharmacyControllers.getAllDrugs,
);
router.get(
    '/drugs/low-stock',
    auth('super-admin', 'domain-admin', 'staff'),
    PharmacyControllers.getLowStockDrugs,
);
router.get(
    '/drugs/:id',
    auth('super-admin', 'domain-admin', 'staff'),
    PharmacyControllers.getSingleDrug,
);
router.patch(
    '/drugs/:id',
    auth('super-admin', 'domain-admin', 'staff'),
    validateRequest(PharmacyValidations.updateDrugValidationSchema),
    PharmacyControllers.updateDrug,
);
router.delete(
    '/drugs/:id',
    auth('super-admin', 'domain-admin'),
    PharmacyControllers.deleteDrug,
);

router.post(
    '/prescriptions/create',
    auth('super-admin', 'domain-admin', 'staff'),
    validateRequest(PharmacyValidations.createPrescriptionValidationSchema),
    PharmacyControllers.createPrescription,
);
router.get(
    '/prescriptions',
    auth('super-admin', 'domain-admin', 'staff'),
    PharmacyControllers.getAllPrescriptions,
);
router.get(
    '/prescriptions/patient/:patientId',
    auth('super-admin', 'domain-admin', 'staff'),
    PharmacyControllers.getPatientPrescriptions,
);

router.post(
    '/dispensing/create',
    auth('super-admin', 'domain-admin', 'staff'),
    validateRequest(PharmacyValidations.createDispensingValidationSchema),
    PharmacyControllers.createDispensing,
);
router.get(
    '/dispensing',
    auth('super-admin', 'domain-admin', 'staff'),
    PharmacyControllers.getAllDispensings,
);

export const PharmacyRoutes = router;
