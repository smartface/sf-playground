import PageSampleDesign from 'generated/pages/pageSample';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Route, BaseRouter as Router } from '@smartface/router';

/**
 * Note for developer:
 * This page is intended for copy/pasting code from documentation.
 * For writing doc or testing things from doc, simply paste the code into this file and do your tests.
 * After you've done, simply revert your changes.
 * DO NOT COMMIT THIS FILE WITH SOMETHING ELSE!!
 */

export default class PageSample extends withDismissAndBackButton(PageSampleDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }
}
