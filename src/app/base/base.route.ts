import express from 'express';
import { ZodObject } from 'zod';
import validateRequest from '../middlewares/validateRequest';
import auth from '../middlewares/auth';
import { TUserRole } from '../modules/user/user.interface';

type TProfileRouteConfig = {
  routePrefix: string;
  createRoles: TUserRole[];
  readRoles: TUserRole[];
  updateRoles: TUserRole[];
  deleteRoles: TUserRole[];
  createValidation: ZodObject<any, any>;
  updateValidation: ZodObject<any, any>;
  controller: {
    create: express.RequestHandler;
    getAll: express.RequestHandler;
    getSingle: express.RequestHandler;
    update: express.RequestHandler;
    delete: express.RequestHandler;
  };
};

export const createProfileRoutes = (config: TProfileRouteConfig) => {
  const router = express.Router();
  const {
    routePrefix,
    createRoles,
    readRoles,
    updateRoles,
    deleteRoles,
    createValidation,
    updateValidation,
    controller,
  } = config;

  router.post(
    `/${routePrefix}`,
    auth(...createRoles),
    validateRequest(createValidation),
    controller.create,
  );
  router.get(
    '/',
    auth(...readRoles),
    controller.getAll,
  );
  router.get(
    '/:id',
    auth(...readRoles),
    controller.getSingle,
  );
  router.patch(
    '/:id',
    auth(...updateRoles),
    validateRequest(updateValidation),
    controller.update,
  );
  router.delete(
    '/:id',
    auth(...deleteRoles),
    controller.delete,
  );

  return router;
};
