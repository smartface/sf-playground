import Application from '@smartface/native/application';
import { Router } from '@smartface/router';
import $$AppRouter from 'generated/router';

class MainRouter extends $$AppRouter {
  constructor() {
    super();
  }
}
Application.on('backButtonPressed', () => {
    Router.getActiveRouter()?.goBack();
  });
  
const router = new MainRouter();

let listenerCounter = 0;

router.listen((location, action) => {
    console.log(`[ROUTER] Counter: ${listenerCounter++} | location url: ${location.url}`);
  });

export default router;
