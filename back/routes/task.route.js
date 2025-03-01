const express = require('express');
const validate = require('../middlewares/validate');
const { taskController } = require('../controllers')
const { taskValidation } = require("../validations")

const router = express.Router();

router.post('/', validate(taskValidation.createTask), taskController.createTask);
router.get('/', validate(taskValidation.getTasks), taskController.getTasks);
router.get('/:taskId', validate(taskValidation.getTask), taskController.getTask);
router.delete('/:taskId', validate(taskValidation.deleteTask), taskController.deleteTask);
router.put('/:taskId', validate(taskValidation.updateTask), taskController.updateTask);
router.post('/:taskId/add-comment', validate(taskValidation.addComment), taskController.addComment);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Task
 *   description: Tasks
 */

/**
 * @swagger
 * /task/:
 *   post:
 *     summary: Create task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - createdBy
 *               - title
 *               - description
 *               - status
 *               - priority
 *               - dueDate
 *               - category
 *             properties:
 *               createdBy:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               priority:
 *                 type: string
 *               dueDate: 
 *                  type: string
 *               category:
 *                  type: string
 *               comments:
 *                   type: array
 *             example:
 *               createdBy: 67bf21eba9211b471af168b7
 *               title: Implement login UI
 *               description: Implement login UI based on Figma file
 *               status: pending
 *               priority: HIGH
 *               dueDate: 2025-03-01T20:00:00.000+00:00
 *               category: Work
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /task/{createdBy}:
 *   get:
 *     summary: Get tasks of users
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: createdBy
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Task:
 *                   $ref: '#/components/schemas/Task'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /task/{taskId}:
 *   get:
 *     summary: Get task by id
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Task id
 *     responses:
 *       "200":
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Task:
 *                   $ref: '#/components/schemas/Task'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /task/{taskId}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Task id
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *          $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /task/{taskId}:
 *   put:
 *     summary: Update task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - createdBy
 *               - title
 *               - description
 *               - status
 *               - priority
 *               - dueDate
 *               - category
 *             properties:
 *               createdBy:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               priority:
 *                 type: string
 *               dueDate: 
 *                 type: string
 *               category:
 *                 type: string
 *               comments:
 *                 type: array
 *             example:
 *               createdBy: 67bf21eba9211b471af168b7
 *               title: Implement login UI
 *               description: Implement login UI based on Figma file
 *               status: In Progress
 *               priority: HIGH
 *               dueDate: 2025-03-15T20:00:00.000+00:00
 *               category: Work
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Task id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /task/add-comment:
 *   post:
 *     summary: Adds a comment to a task.
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *     requestParams:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - comment
 *             properties:
 *               id:
 *                 type: string
 *               comment:
 *                 type: string
 *             example:
 *               id: 67bf21eba9211b471af168b7
 *               comment: Figma file updated
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 */