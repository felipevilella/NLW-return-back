import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCasesRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCases {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) { }


    async execute({ comment, type, screenshot }: SubmitFeedbackUseCasesRequest) {
        if (!type) {
            throw new Error('Type is required')
        }

        if (!comment) {
            throw new Error('Comment is required')
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format')
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        });

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style= "font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p> Tipo do feedback: ${type} </p>`,
                `<p> Comentário: ${comment} </p>`,
                screenshot ? `<img src="${screenshot} />`: null,
                `</div>`
            ].join('\n')
        })
    }
}