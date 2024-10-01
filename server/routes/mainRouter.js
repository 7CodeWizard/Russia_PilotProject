const express = require('express')
const caseController = require('../controllers/caseController')
const siteController = require('../controllers/siteController')
const equipController = require('../controllers/equipController')
const cusController = require('../controllers/reviewController')
const facController = require('../controllers/factoryController')
const threeController = require('../controllers/threeController')
const emailController = require('../controllers/emailController')
const participantController = require('../controllers/participantController')
const rentalController = require('../controllers/rentalController')
const teamController = require('../controllers/teamController')
const searchController = require('../controllers/searchController')
const { upload_cases, upload_equipment, upload_factory, upload_review, upload_site, upload_three, upload_attach, upload_solution, upload_participant, upload_rental } = require('../controllers/uploadfile')

const mainRouter = express.Router()
mainRouter.route('/cases')
  .get(caseController.getCases)
  .post(upload_cases.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }, { name: 'photo', maxCount: 1 }]), caseController.insertCase)

mainRouter.route('/cases/solution')
  .post(upload_solution.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }]), caseController.insertSolution)

mainRouter.route('/cases/checkbox')
  .get(caseController.getCasesWithCheckbox);

mainRouter.route('/cases/type')
  .get(caseController.getCaseByType);

mainRouter.route('/cases/:caseid')
  .get(caseController.getCaseByID)
  .delete(caseController.deleteCase)
  .put(upload_cases.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }, { name: 'photo', maxCount: 1 }]), caseController.updateCase)

// sites Router
mainRouter.route('/sites')
  .get(siteController.getSites)
  .post(upload_site.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), siteController.insertSite)

mainRouter.route('/sites/six')
  .get(siteController.getsixSites)

mainRouter.route('/sites/:siteid')
  .get(siteController.getSiteByID)
  .delete(siteController.deleteSite)
  .put(upload_site.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), siteController.updateSite)

// equipments Router
mainRouter.route('/equipments')
  .get(equipController.getEquipments)
  .post(upload_equipment.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }, { name: 'files', maxCount: 1 }]), equipController.insertEquipment)

mainRouter.route('/equipments/type')
  .get(equipController.getEquipmentsByType)

mainRouter.route('/equipments/:equipid')
  .get(equipController.getEquipmentByID)
  .delete(equipController.deleteEquipment)
  .put(upload_equipment.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }, { name: 'files', maxCount: 1 }]), equipController.updateEquipment)

// reviews Router
mainRouter.route('/reviews')
  .get(cusController.getReviews)
  .post(upload_review.single('files'), cusController.createReview)

mainRouter.route('/reviewsBytype')
  .get(cusController.getReviewsBytype)

mainRouter.route('/reviews/:cusid')
  .get(cusController.getReviewByID)
  .delete(cusController.deleteReview)
  .put(upload_review.single('files'), cusController.updateReview)

// factorys Router
mainRouter.route('/factorys')
  .get(facController.getFactorys)
  .post(upload_factory.single('video'), facController.createFactory)

mainRouter.route('/factorys/top')
  .get(facController.getTopFactorys)

mainRouter.route('/factorys/:facid')
  .get(facController.getFactoryById)
  .delete(facController.deleteFactory)
  .put(upload_factory.single('video'), facController.updateFactory)

// threes Router
mainRouter.route('/threes')
  .get(threeController.getThrees)
  .post(upload_three.single('video'), threeController.insertThree)

mainRouter.route('/threes/:threeid')
  .get(threeController.getThreeByID)
  .delete(threeController.deleteThree)
  .put(upload_three.single('video'), threeController.updateThree)

// emails Router
mainRouter.route('/sendEmail')
  .post(upload_attach.single('video'), emailController.sendEmail)

// participant Router
mainRouter.route('/participant')
  .get(participantController.getParticipants)
  .post(upload_participant.single('image'), participantController.createParticipant)

mainRouter.route('/showparticipant')
  .get(participantController.getShowParticipants)

mainRouter.route('/participant/:participantId')
  .get(participantController.getParticipantById)
  .delete(participantController.deleteParticipant)
  .put(upload_participant.single('image'), participantController.updateParticipant)

mainRouter.route('/rental')
  .get(rentalController.getRental)
  .post(upload_rental.fields([{ name: 'images', maxCount: 10 }, { name: 'files', maxCount: 5 }]), rentalController.createOrUpdateRental)

mainRouter.route('/team')
  .get(teamController.getTeam)
  .post(teamController.createOrUpdateTeam)

mainRouter.route('/getSearchData')
  .post(searchController.searchData)

module.exports = mainRouter