import badgeProcessingRoute from './badgeProcessing/badgeProcessing.routes.js';
import badgeProcessingController from './badgeProcessing/badgeProcessing.controller.js';
import badgeProcessingService from './badgeProcessing/badgeProcessing.service.js';


export const badgeProcessingModule = {
  routes: badgeProcessingRoute,
  controller: badgeProcessingController,
  service: badgeProcessingService
};