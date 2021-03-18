import './index.css';

import NewsCard from './js/components/NewsCard';
import NEWS_CARD_SETTINGS from './js/constants/NewsCard_Settings';

import MessageWidget from './js/components/MessageWidget';
import MASSAGE_WIDGET_SETTINGS from './js/constants/MessageWidget_Settings';

import Api from './js/api/Api';

const api = new Api();
const messageWidget = new MessageWidget(MASSAGE_WIDGET_SETTINGS);
const newsCard = new NewsCard(NEWS_CARD_SETTINGS, messageWidget, api);

newsCard.create();
