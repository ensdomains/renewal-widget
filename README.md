# ENS Renewal widget

ENS Renewal widget displays a popup window if there are any expiring ENS names.

## Install

```
npm install @ensdomains/renewal-widget
```

## Initialising


```
import RenewalWidget from '@ensdomains/renewal-widget'
RenewalWidget({
    userAddress,
    queryParams:{"utm_source": "YOURSITE", "utm_medium": "web", "utm_campaign":"renewal"}
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
    queryParams:{"utm_source": "YOURSITE", "utm_medium": "web", "utm_campaign":"renewal"}
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
