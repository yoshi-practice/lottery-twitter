const Twit = require('twit');

const T = new Twit({
  consumer_key:        "",
  consumer_secret:     "",
  access_token_key:    "",
  access_token_secret: "",
  app_only_auth: true
});

let num = 0;
let lastId = '';

// since:2019-11-20_00:00:00_JST until:2019-12-11_23:59:59_JST
let params = {
    q: '#findy since:2019-11-20_00:00:00_JST until:2019-12-11_23:59:59_JST',
    count: 5,
    max_id: lastId,
    result_type: 'recent',
    include_entities: false
  }

  !(async () => {
    for (let i = 1; i <= 5; i++) {
      console.log('\n\n' + i + '回目の検索開始　ID' + lastId + '以前のツイートを検索');
      params.max_id = lastId;
      const result = await T.get('search/tweets', params);
      result.data.statuses.forEach(function (val, index, ar) {
        num++;
        console.log(`\n${parseInt(index) + 1}個目のツイート　（累計${num}個目）`);
        console.log('@' + val.user.screen_name);
        console.log(val.text.replace(/\r?\n/g, ''));
        lastId = val.id_str;
        console.log('ツイートのIDは' + lastId);
      })
      console.log('\n最後のツイートのIDは' + lastId);
    }
  })();