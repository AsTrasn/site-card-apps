import * as React from 'react';
import styles from './CardSites.module.scss';
import { ICardSitesProps } from './ICardSitesProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class CardSites extends React.Component<ICardSitesProps, {}> {
  public render(): React.ReactElement<ICardSitesProps> {
    const {
      description,
      image,
      publicLink,
      privateLink,
      title,
    } = this.props;

    return (
        <section className={`${styles.cardSites} ${styles.teams} ${styles.card}`}>
          
          <div>
            <div className={`${styles.flex}`}>
              <img src={image} alt={escape(title)} className={`${styles.logo}`}/>
              <div>
                <p><span className={`${styles.titleCard}`}>{escape(title)}</span>{title && ':'} {escape(description)}</p>
              </div>
            </div>
            <div className={`${styles.links}`}>
                {publicLink && <a href={publicLink} target='_blank' rel='noreferrer' className={`${styles.link}`}>Ir al sitio público</a>}
                {privateLink && <a href={privateLink} target='_blank' rel='noreferrer' className={`${styles.link}`}>Ir al sitio privado</a>}
            </div>
          </div>
        </section>
    );
  }
}
