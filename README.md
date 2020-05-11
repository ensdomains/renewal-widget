# ENS Renewal widget

ENS Renewal widget displays a popup window if there are any expiring ENS names.

NOTE: We will be whitelisting the rererral partners. To apply, please read FAQ.

## Install

```
npm install @ensdomains/renewal-widget
```

## Initialising


```
import RenewalWidget from '@ensdomains/renewal-widget'
RenewalWidget({
    userAddress,
    queryParams:{"utm_source": "YOURSITE"},
    days: 30 // optional. The default is set to 30 days beore expiry date.
})
```

## CDN

```
<script
    async
    src="https://cdn.jsdelivr.net/npm/@ensdomains/renewal-widget@latest/build/renewal-widget.js"
></script>

<script>
RenewalWidget({
    userAddress,
    queryParams:{"utm_source": "YOURSITE"},
    days: 30 // optional. The default is set to 30 days beore expiry date.
})
</script>
```

## Trying out locally

NOTE: Currently hard coding userAddress as `0xfFD1Ac3e8818AdCbe5C597ea076E8D3210B45df5`

```
git clone https://github.com/ensdomains/renewal-widget.git
cd renewal-widget
npm install
npm run dev
```

And open the demo page on http://localhost:8080

## Live demo page 

- [kickback.events](https://kickback.events) ([PR](https://github.com/wearekickback/app/pull/338/files))

If you connect with the address which owns expiring/expired ENS names, it should popup the widget when your app connects to your wallet.

![](https://i.ibb.co/dQ6nhxd/Screenshot-2020-05-11-at-10-30-06.png)

If you don't connect with such addresses, you can still see the demo by passing the address of an ENS whale 

- https://kickback.events/?RWuserAddress=0xa7f3659c53820346176f7e0e350780df304db179&RWdays=300


## FAQ

### How do you track the referral code?

We will be using [Google Analytics ecommerce plugin](https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce) on [ENS App](https://app.ens.domains).

### How much is the referral fee?

5% to begin with (at least until August 2021). We will revise the rate periodically.

### How do I become the referral partner?

Please apply via [google form](https://forms.gle/zCX5RH1aQ4RnTnAXA)

### I want to customise the widget.

If you want to have full control of how to show ENS referral, I suggest using our [renewal library](https://github.com/ensdomains/renewal) wchich this widget uses underneath.

### What if our app/site has our own way of renewing ENS withing going to app.ens.domains?

Please contact makoto@ens.domains. We can discuss separately.
