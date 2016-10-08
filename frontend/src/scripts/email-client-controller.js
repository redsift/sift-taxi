/**
 * sift-taxi: email client controller entry point.
 *
 * Copyright (c) 2016 Redsift Limited
 */
import { EmailClientController, registerEmailClientController } from '@redsift/sift-sdk-web';

export default class TaxiEmailClientController extends EmailClientController {
  constructor() {
    super();
    this._companyColors = {
      'hailo': { color: '#000000', backgroundColor: '#ffbb00'},
      'uber':  { color: '#000000', backgroundColor: '#1fbad6'},
      'addisonlee':  { color: '#ffffff', backgroundColor: '#000000'},
    }
  }

  loadThreadListView (listInfo) {
    let label = parseInt(listInfo.total).toLocaleString(navigator.language, { style: 'currency', currency: listInfo.currency, maximumFractionDigits: 2 });
    if (listInfo.converted === true) {
      label = '~' + label;
    }
    let ret = {
      template: '001_list_common_txt',
      value: {
        color: this._companyColors[listInfo.company].color,
        backgroundColor: this._companyColors[listInfo.company].backgroundColor
      }
    };
    ret.value.subtitle = label;
    return ret;
  };
}

registerEmailClientController(new TaxiEmailClientController());
