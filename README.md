# ENS Renewal widget

ENS Renewal widget displays a popup window if there are any expiring ENS names.

## Usage

Insert the following code into index.html

```
    <div
        data-widget-host="ensdomains-renewal-widget"
        data-props-utm-paramsdata-props-utm-params='{"utm_source": "YOURSITE", "utm_medium": "web", "utm_campaign":"renewal"}'
    >
    </div>
    <script async src="https://cdn.jsdelivr.net/npm/@ensdomains/renewal-widget/build/bundle.js"></script>
```

If you pass  `data-prop-user-address="ETHADDRESS"` it loads expiring name of the specified Ethereum address.
Otherwise, the widget calls `window.ethereum.enable()` to get the Ethereum address.

## Trying out locally

NOTE: Currently hard coding userAddress as `0xfFD1Ac3e8818AdCbe5C597ea076E8D3210B45df5`

```
git clone https://github.com/ensdomains/renewal-widget.git
cd renewal-widget
npm install
npm run dev
```

And open the demo page on http://localhost:8080
