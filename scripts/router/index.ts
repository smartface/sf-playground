import $$AppRouter from 'generated/router';

class MainRouter extends $$AppRouter {
  constructor() {
    super();
  }
}

const router = new MainRouter();

let listenerCounter = 0;

router.listen((location, action) => {
    console.log(`[ROUTER] Counter: ${listenerCounter++} | location url: ${location.url}`);
  });

export default router;
