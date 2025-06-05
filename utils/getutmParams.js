export const getUTMParams = () =>{
  const params = new URLSearchParams(window.location.search);
  if (!params.get("utm_medium") && !params.get("utm_source")) {
    var source = 'direct';
    var medium = 'direct';
    
    var sources = [
        { domain: "www.google", source: "organic", medium: "google" },
        { domain: "www.bing.com", source: "organic", medium: "bing" },
        { domain: "www.facebook.com", source: 'social', medium: "facebook" },
        { domain: "www.instagram.com", source: 'social', medium: "instagram" },
        { domain: "www.linkedin.com", source: 'social', medium: "linkedin" },
        { domain: "twitter.com", source: 'social', medium: "twitter" },
        { domain: "www.myholidays.com", source: 'direct', medium: 'direct'},
        { domain: "stg.myholidays.com", source: 'direct', medium: 'direct'},
        { domain: "localhost:3000", source: 'direct', medium: 'direct'}
    ];

    if (document.referrer) {
        var referrerURL = new URL(document.referrer);
        var find = { source: 'referral', medium: referrerURL.hostname };
        if (referrerURL.hostname.includes(sources[0].domain)) {
            find = { source: 'organic', medium: "google" + referrerURL.hostname.replace(sources[0].domain, '') };
        } else {
            var findSource = sources.find(function (i) { return i.domain === referrerURL.hostname; });
            find = findSource && findSource.domain ? findSource : find;
          }
          source = find.source;
          medium = find.medium;
        } 


    }
  return{
    utmSource: params.get('utm_source') || source || '',
    utmMedium: params.get('utm_medium') || medium ||  ''
  };
}