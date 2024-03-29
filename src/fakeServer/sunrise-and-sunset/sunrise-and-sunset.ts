import { rest } from 'msw';
import fakeServer from '../fakeServer';

const url = 'https://api.sunrise-sunset.org/json';

const getSunriseAndSunset = () => {
  fakeServer.use(
    rest.get(url, (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          results: {
            sunrise: '2015-05-21T05:05:35+00:00',
            sunset: '2015-05-21T19:22:59+00:00',
            solar_noon: '2015-05-21T12:14:17+00:00',
            day_length: 51444,
            civil_twilight_begin: '2015-05-21T04:36:17+00:00',
            civil_twilight_end: '2015-05-21T19:52:17+00:00',
            nautical_twilight_begin: '2015-05-21T04:00:13+00:00',
            nautical_twilight_end: '2015-05-21T20:28:21+00:00',
            astronomical_twilight_begin: '2015-05-21T03:20:49+00:00',
            astronomical_twilight_end: '2015-05-21T21:07:45+00:00',
          },
          status: 'OK',
        })
      )
    )
  );
};

const getSunriseAndSunset500 = () => {
  fakeServer.use(rest.get(url, (req, res, ctx) => res(ctx.status(500))));
};

export { getSunriseAndSunset, getSunriseAndSunset500 };
