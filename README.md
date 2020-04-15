# ENS Renewal widget

ENS Renewal widget displays a popup window if there are any expiring ENS names.

## Usage

Insert the following code into the page which wants to display the widget.

```
    <div data-widget-host="ensdomains-renewal-widget">
      <script type="text/props">
        {
          "referrerAddress": "0xfFD1Ac3e8818AdCbe5C597ea076E8D3210B45df5",
          "userAddress": "0xfFD1Ac3e8818AdCbe5C597ea076E8D3210B45df5"
        }
      </script>
    </div>
    <script async src="SCRIPT_URL"></script>
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

## TODO

- Change loading order so that widget gets loaded after embeding site is loaded (so that we don't block the page we aree integrating)
- Deploy and replace SCRIPT_URL with real URL
- Fail gracelfully for eth addresses which do not own any ENS name
- Test with envs other than Metamask
