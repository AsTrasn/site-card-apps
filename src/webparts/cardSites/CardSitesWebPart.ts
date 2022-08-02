import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'CardSitesWebPartStrings';
import CardSites from './components/CardSites';
import { ICardSitesProps } from './components/ICardSitesProps';

export interface ICardSitesWebPartProps {
  description: string;
  image: string;
  publicLink: string;
  privateLink: string;
  title: string;
}



export default class CardSitesWebPart extends BaseClientSideWebPart<ICardSitesWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<ICardSitesProps> = React.createElement(
      CardSites,
      {
        description: this.properties.description,
        image: this.properties.image,
        publicLink: this.properties.publicLink,
        privateLink: this.properties.privateLink,
        title: this.properties.title,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
              PropertyPaneTextField('title', {
                label: 'Nombre de la aplicación',
              }),
              PropertyPaneTextField('description', {
                label: 'Descripcion de la aplicación',
                multiline: true
              }),
              PropertyPaneTextField('image', {
                label: 'Enlace de la imagen',
              }),
              PropertyPaneTextField('publicLink', {
                label: 'Enlace público',
              }),
              PropertyPaneTextField('privateLink', {
                label: 'Enlace privado',
              }),
            ]
            }
          ]
        }
      ]
    };
  }
}