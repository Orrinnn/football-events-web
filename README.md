# Football Events Web

Next.js framendi fyrir Football Events API í Vefforritun 2.

## Tækni
- Next.js
- TypeScript
- App Router
- ESLint
- CSS með responsive layout

## Athugasemd um myndaupphleðslu

Myndaupphleðslusíða er útfærð í framenda og tenging við upload virkni er undirbúin í Next.js verkefninu.  
Hins vegar er `/upload` endpoint ekki virkt í núverandi deployuðu backend útgáfu á Render þegar þessu er skilað, þannig að myndaupphleðsla virkar ekki end-to-end í hýstri útgáfu akkúrat núna.

Önnur virkni, þar á meðal:
- innskráning / nýskráning
- listun viðburða
- stök viðburðasíða
- stofnun nýs viðburðar

virkar á móti backend þjónustunni.

## Keyrsla locally

```bash
npm install
npm run dev