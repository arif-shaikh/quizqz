import { Participant, ParticipantList } from "./participant";
import {IQuestion} from './questionCollection';
import { QuestionList } from "./question-list";
import express from "express";

export class QuizServerRoutes {
    private participantList: ParticipantList = new ParticipantList();
    private questionList: QuestionList = new QuestionList();

    constructor (private router: express.Application) {

        this.router.post('/registerParticipant', this.registerParticipant);
        this.router.get('/participantList', this.getParticipantList);
        this.router.get('/questionList', this.getQuestionList);
        this.router.post('/updateScore', this.updateScore);
    }

    //app.post('/registerParticipant', (req, res) => 
    registerParticipant = async (req: express.Request, res: express.Response) => {
        let inParticipantName: string = req.body.name;

        let foundParticipant = this.participantList.add(inParticipantName);
        if (foundParticipant) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(foundParticipant));
        } else {
            res.status(404);
            res.end();
        }
    }

    //app.get('/participantList', (req, res) => 
    getParticipantList = async (req: express.Request, res: express.Response) => {
        let participantList = this.participantList.getList();
        if (participantList){
            res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(participantList));
        } else {
            res.status(404);
            res.end();
        }
    }

    //app.get('/questionList', (req, res) => 
    getQuestionList = async (req: express.Request, res: express.Response) => {
        let questionOnlyList: IQuestion[] = this.questionList.getList(0);
        if(questionOnlyList){
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(questionOnlyList));
        } else {
            res.status(404);
            res.end();
        }
    }

    //app.post('/updateScore', (req, res) => 
    updateScore = async (req: express.Request, res: express.Response) => {
        let inParticipantId:number = req.body.id;
        let inParticipantscore:number = req.body.Score;
        let inParticipantTimespent:number = req.body.TimeSpent;

        let foundParticipant = this.participantList.getById(inParticipantId);
        if (foundParticipant){
            foundParticipant.score = inParticipantscore;
            foundParticipant.timespent = inParticipantTimespent;
            res.status(200);
            res.end();
        } else {
            res.status(404);
            res.end();
        }
    }
}