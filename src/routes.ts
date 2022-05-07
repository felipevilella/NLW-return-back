import express from 'express'
import { SubmitFeedbackUseCases } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prima-feedbacks-repository';
import { NodemailMAilAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router()

routes.post("/feedbacks", async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailMAilAdapter = new NodemailMAilAdapter();
    
    const submitFeedbackUseCase = new SubmitFeedbackUseCases(
        prismaFeedbacksRepository,
        nodemailMAilAdapter
    );


    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })

    return res.status(201).send();
})
