# ENS Renewal widget

ENS Renewal widget displays a popup window if there are any expiring ENS names.

NOTE: We will be whitelisting the rererral partners. To apply, please apply via [google form](https://forms.gle/zCX5RH1aQ4RnTnAXA).

## Install

```
npm install @ensdomains/renewal-widget
```

## Initialising


```
import RenewalWidget from '@ensdomains/renewal-widget'
RenewalWidget({
    userAddress,
    queryParams:{"utm_source": "YOURSITE"}
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
    queryParams:{"utm_source": "YOURSITE"}
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


