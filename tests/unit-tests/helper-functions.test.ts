import axios from 'axios';
import { expect } from 'chai';
import { readFileSync } from 'fs';
import Sinon = require('sinon');
import mongoose from 'mongoose';
import { Card, FightCard, IFight } from '../../interfaces';
import * as helperFunction from '../../scraper/scraper-functions';
import { populateDatabase } from '../../controllers/middlewares/populate-database';
import * as FightService from '../../services/fight-service';
import * as FightsCardService from '../../services/fights-card-service';

const htmlPageMock = JSON.parse(readFileSync('./tests/html-page-mock.json', 'utf8'));
const htmlCardsPageMock = JSON.parse(readFileSync('./tests/html-fightCard-mock.json', 'utf8'));

describe('Tests helper functions', () => {
  const fightMock: IFight = {
    _id: 'sampleId' as any,
    title: 'fight title',
    url: 'fightUrl',
    date: new Date(),
    time: 'fightTime',
    fightNight: true,
  };

  const fightsCardMock: FightCard = {
    fight: 'sampleId' as any,
    card: [
      {
        redCornerName: 'Rob Font',
        redCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2021-05/69105%252Fprofile-galery%252Ffullbodyleft-picture%252FFONT_ROB_L_05-22.png?VersionId=null&itok=HvqDL3hG',
        blueCornerName: 'Marlon Vera',
        blueCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2021-06/68723%252Fprofile-galery%252Ffullbodyright-picture%252FVERA_MARLON_R_06-19.png?VersionId=null&itok=r_84HPVJ',
      },
      {
        redCornerName: 'Andrei Arlovski',
        redCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2021-04/67319%252Fprofile-galery%252Ffullbodyleft-picture%252FARLOVSKI_ANDREI_L_04-17.png?VersionId=null&itok=8OnocL_9',
        blueCornerName: 'Jake Collier',
        blueCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2021-06/68155%252Fprofile-galery%252Ffullbodyright-picture%252FCOLLIER_JAKE_R_06-12.png?VersionId=null&itok=NVjWckS2',
      },
      {
        redCornerName: 'Andre Fili',
        redCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2021-06/67307%252Fprofile-galery%252Ffullbodyleft-picture%252FFILI_ANDRE_L_06-26.png?itok=Zd2IyCNm',
        blueCornerName: 'Joanderson Brito',
        blueCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2022-01/BRITO_JOANDERSON_R_01-15.png?itok=9vSP5ywp',
      },
      {
        redCornerName: 'Jared Gordon',
        redCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2021-10/68187%252Fprofile-galery%252Ffullbodyleft-picture%252FGORDON_JARED_L_10-02.png?itok=iqRC2LqG',
        blueCornerName: 'Grant Dawson',
        blueCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2022-04/ba03a3e1-6f90-4269-bb46-4c9cb0613432%252FDAWSON_GRANT_R_10-23.png?itok=9FxyuVs-',
      },
      {
        redCornerName: 'Darren Elkins',
        redCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2021-07/67752%252Fprofile-galery%252Ffullbodyleft-picture%252FELKINS_DARREN_L_07-24.png?itok=k-gHorrJ',
        blueCornerName: 'Tristan Connelly',
        blueCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2021-04/71589%252Fprofile-galery%252Ffullbodyright-picture%252FCONNELLY_TRISTAN_R_04-24.png?VersionId=null&itok=-hquUahp',
      },
      {
        redCornerName: 'Krzysztof Jotko',
        redCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2021-05/68525%252Fprofile-galery%252Ffullbodyleft-picture%252FJOTKO_KRZYSZTOF_L_05-01.png?VersionId=null&itok=nlfTIhbF',
        blueCornerName: 'Gerald Meerschaert',
        blueCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2021-04/68011%252Fprofile-galery%252Ffullbodyright-picture%252FMEERSCHAERT_GERALD_R_04-17.png?VersionId=null&itok=EXGZvhgE',
      },
      {
        redCornerName: 'Alexandr Romanov',
        redCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2022-04/318f6bdb-ab1d-4e95-8328-37d1e0d4072f%252FROMANOV_ALEXANDR_L_04-23.png?itok=LBAzltnK',
        blueCornerName: 'Chase Sherman',
        blueCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2022-04/e273df3c-9095-46b1-85f8-029aa2ce4a3c%252FSHERMAN_CHASE_R_04-23.png?itok=stKtpMvt',
      },
      {
        redCornerName: 'Daniel Lacerda',
        redCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2022-04/c0a73801-38e7-4887-9814-744e6443488b%252FDA_SILVA_DANIEL_L_10-23.png?itok=o0WJR0i8',
        blueCornerName: 'Francisco Figueiredo',
        blueCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2021-07/FIGUEIREDO_FRANCISCO_R_07-17.png?itok=wV7dheqX',
      },
      {
        redCornerName: 'Gabriel Green',
        redCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2022-04/001f81ff-e238-4d76-93b5-a74d59f4550a%252FGREEN_GABE_L_04-30.png?itok=aYfPst5q',
        blueCornerName: 'Yohan Lainesse Lainesse',
        blueCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2022-04/60cd2945-195c-463b-9736-912fe156bf57%252FLAINESSE_YOHAN_R_04-30.png?itok=lWQGVa_h',
      },
      {
        redCornerName: 'Natan Levy',
        redCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2022-04/ec33ffaf-1ad4-428c-b4ea-2548c4fe74f1-LEVY_NATAN_L_11-20.png?itok=PnzY6e-N',
        blueCornerName: 'Mike Breeden',
        blueCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2021-10/71643%252Fprofile-galery%252Ffullbodyright-picture%252FBREEDEN_MIKE_R_10-02.png?itok=LGJ0_6jV',
      },
      {
        redCornerName: 'Gina Mazany',
        redCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2022-04/b411a4b0-8007-47f9-8ac7-dcb6a3adbb89%252FMAZANY_GINA_L_04-30.png?itok=__QJfGLf',
        blueCornerName: 'Shanna Young',
        blueCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2021-10/69253%252Fprofile-galery%252Ffullbodyright-picture%252FYOUNG_SHANNA_R_10-02.png?itok=BfTSd1HI',
      },
      {
        redCornerName: 'Tatsuro Taira',
        redCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2022-04/b723de70-8e89-4aca-b168-65919326693f%252FTAIRA_TATSURO_L_04-30.png?itok=_syVNT41',
        blueCornerName: 'Carlos Candelario',
        blueCornerPhoto: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2022-04/00728940-803a-49cf-abfc-268cbba2fd63%252FCANDELARIO_CARLOS_R_04-30.png?itok=WXr3jjGD',
      },
    ],
  };

  afterEach(() => {
    Sinon.restore();
  });

  describe('Tests populateDatabase function', () => {
    beforeEach(() => {
      Sinon.stub(helperFunction, 'fetchFights').resolves([fightMock]);
      Sinon.stub(helperFunction, 'fetchFightsCard').resolves([fightsCardMock]);
    });

    afterEach(() => {
      Sinon.restore();
    });

    it('Tests FightsCardService.deleteMany() and FightService.deleteMany() are called', async () => {
      Sinon.stub(mongoose.Model, 'create').resolves();

      const fightsCardDeleteMany = Sinon.stub(FightsCardService, 'deleteMany').resolves();
      const fightsDeleteMany = Sinon.stub(FightService, 'deleteMany').resolves();

      await populateDatabase();
      Sinon.assert.calledOnce(fightsCardDeleteMany);
      Sinon.assert.calledOnce(fightsDeleteMany);
    });

    it('Tests FightsCardService.create() and FightService.create() are called with expected values', async () => {
      Sinon.stub(mongoose.Model, 'deleteMany').resolves();

      const fightsCardCreate = Sinon.stub(FightsCardService, 'create').resolves();
      const fightsCreate = Sinon.stub(FightService, 'create').resolves();

      await populateDatabase();
      Sinon.assert.calledOnceWithExactly(fightsCardCreate, [fightsCardMock]);
      Sinon.assert.calledOnceWithExactly(fightsCreate, [fightMock]);
    });
  });

  describe('Tests fetchFights function', () => {
    it('Returns array of fights', async () => {
      const axiosStub = Sinon.stub(axios, 'get').resolves({ data: htmlPageMock });
      const fights = await helperFunction.fetchFights();
      Sinon.assert.calledOnceWithExactly(axiosStub, 'https://www.ufc.com.br/events');
      expect(fights.length).to.be.equal(4);
      fights.forEach((fight: IFight) => {
        expect(fight).to.have.property('title');
        expect(fight).to.have.property('url');
        expect(fight).to.have.property('date');
        expect(fight).to.have.property('time');
        expect(fight).to.have.property('fightNight');
      });
    });
  });

  describe('Tests fetchFightsCard function', () => {
    it('Returns array of fightsCard', async () => {
      const axiosStub = Sinon.stub(axios, 'get').resolves({ data: htmlCardsPageMock });
      const fightsCard = await helperFunction.fetchFightsCard([fightMock]);
      
      fightsCard.forEach((fight: FightCard) => {
        const { url } = fightMock;
        Sinon.assert.calledOnceWithExactly(axiosStub, url);
        expect(fight).to.have.property('fight');
        expect(fight.fight).to.equal(fightMock._id);
        expect(fight).to.have.property('card');
        expect(fight.card).to.be.an('array');
        fight.card.forEach((card: Card, index) => {
          expect(card).to.have.property('redCornerName');
          expect(card).to.have.property('redCornerPhoto');
          expect(card).to.have.property('blueCornerName');
          expect(card).to.have.property('blueCornerPhoto');
          expect(card).to.deep.equal(fightsCardMock.card[index]);
        });
      });
    });
  });

  describe('Tests fetchPageHtml function', () => {
    it('Calls axios with correct url', async () => {
      const axiosStub = Sinon.stub(axios, 'get').resolves({ data: 'sampleTest' });

      await helperFunction.fetchPageHtml('testUrl');
      Sinon.assert.calledOnceWithExactly(axiosStub, 'testUrl');
    });
  });
});