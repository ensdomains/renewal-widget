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

- Come up with a way to set `userAddress` dynamically so that the dapp can call it when
- Upgrade preact to 10x and change to functional component.
- Add close button
- Make "Renew" button work
- Add "Don't show this message again"
- Deploy and replace SCRIPT_URL with real URL
