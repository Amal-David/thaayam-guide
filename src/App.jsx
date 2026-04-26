import { useEffect, useMemo, useState } from 'react'
import {
  Brain,
  Dices,
  Flag,
  Languages,
  Landmark,
  MoveRight,
  Percent,
  Route,
  ShieldCheck,
  Swords,
  Trophy,
  UsersRound,
} from 'lucide-react'
import './App.css'

const copy = {
  en: {
    code: 'EN',
    label: 'English',
    title: 'Thaayam Guide',
    eyebrow: 'Also called Dayaakattai',
    intro:
      'Learn the chalk-board setup, Dayakattai stick throws, entry rules, cutting, safe zones, and exact finish in a few minutes.',
    alias: 'Dayaakattai is another common name for Thaayam.',
    cta: 'Start with setup',
    nav: [
      ['setup', 'Setup'],
      ['throws', 'Throws'],
      ['turn', 'Turn flow'],
      ['route', 'Route'],
      ['capture', 'Capture'],
      ['finish', 'Finish'],
      ['strategy', 'Strategy'],
      ['history', 'History'],
    ],
    stats: [
      ['Players', '2-4'],
      ['Dice', '2 sticks'],
      ['Pieces each', '6 or 12'],
      ['Safe X', '9'],
    ],
    setup: {
      kicker: '01',
      title: 'Draw and set up',
      body:
        'The video version is the Dayaakattai style: draw the grid with chalk, mark safe zones with X, and keep each player’s coins or buttons in an off-board home pile before entry.',
      notes: [
        'Use coins, buttons, stones, shells, or any small markers as pieces.',
        'Each player usually starts with six or twelve pieces in home.',
        'The X-marked squares are safe: pieces there cannot be cut.',
      ],
      detailsTitle: 'What to draw',
      details: [
        ['Grid', 'Draw a clear 7 x 7 square grid. The video uses chalk on the floor.'],
        ['Safe squares', 'Mark nine squares with a large X in the same diamond pattern shown on the board.'],
        ['Player homes', 'Keep each player’s pieces as a separate pile outside the board until they enter.'],
        ['Start marks', 'Use small colored marks near the sides so everyone remembers their entry side.'],
      ],
    },
    throws: {
      kicker: '02',
      title: 'Read the Dayakattai sticks',
      body:
        'Roll the two long cuboid sticks. Each stick can show 0, 1, 2, or 3. Add the two faces, except 0 + 0 counts as 12.',
      table: [
        ['0 + 0', '12'],
        ['0 + 1', '1 / Dayam'],
        ['1 + 3', '4'],
        ['2 + 3', '5'],
        ['3 + 3', '6'],
      ],
      simulator: 'Roll sticks',
      result: 'Result',
      bonus: 'Bonus roll on 1, 5, 6, or 12.',
      die: 'Die',
      matrixTitle: 'All stick totals',
      matrixHeader: ['Die 1 / Die 2', '0', '1', '2', '3'],
      matrix: [
        ['0', '12', '1', '2', '3'],
        ['1', '1', '2', '3', '4'],
        ['2', '2', '3', '4', '5'],
        ['3', '3', '4', '5', '6'],
      ],
    },
    turn: {
      kicker: '03',
      title: 'Play one turn',
      body:
        'Roll, collect any bonus rolls, then spend the recorded numbers. A Dayam is needed to bring each piece out of home.',
      steps: [
        ['Roll', 'Throw both sticks. Rolls of 1, 5, 6, and 12 earn another throw.'],
        ['Enter', 'A Dayam, shown as 0 + 1, brings one piece out from the home pile.'],
        ['Move', 'Use the recorded scores on one piece or divide them among several pieces.'],
        ['Resolve', 'Cut enemies on unsafe squares, respect X safe zones, and finish by exact count.'],
      ],
      exampleTitle: 'Example turn',
      example: [
        ['0 + 1 = 1', 'Dayam: enter one piece and roll again.'],
        ['2 + 3 = 5', 'Bonus score: keep it and roll again.'],
        ['0 + 0 = 12', 'Bonus score: keep it and roll again.'],
        ['0 + 2 = 2', 'No bonus: now spend 1, 5, 12, and 2 legally.'],
      ],
    },
    route: {
      kicker: '04',
      title: 'Read the board',
      body:
        'The video board is a 7 x 7 chalk grid. Pieces travel around the outer track, then turn inward toward the center home. X-marked squares are safety.',
      controls: ['South', 'West', 'North', 'East'],
      hint: 'Select a player to rotate the starting side and finish lane.',
      home: 'Home',
      safe: 'Safe X',
      detailsTitle: 'What the diagram shows',
      details: [
        ['Outer track', 'The highlighted path follows the outside of the 7 x 7 board first.'],
        ['Turn inward', 'After the lap, the route bends into the center lane.'],
        ['X safety', 'The nine chalk X marks form a diamond pattern: one top, three across the middle, one bottom, and paired diagonals.'],
        ['Rotation', 'The same logic rotates for each player’s side.'],
      ],
    },
    capture: {
      kicker: '05',
      title: 'Capture carefully',
      body:
        'Landing on an opponent’s piece cuts it and sends it back to home. X-marked safe zones protect pieces from being cut.',
      rules: [
        ['Safe X zones', 'A piece on an X-marked square cannot be cut by an opponent.'],
        ['Shared throws', 'A run such as 5, 12, 2 can be split between pieces or spent on one piece.'],
        ['Pairs variant', 'Some longer games use paired pieces that move on even throws and are harder to cut.'],
      ],
      detailTitle: 'Cutting checklist',
      detailRules: [
        ['Same square', 'A cut happens only when you land exactly on an opponent’s occupied square.'],
        ['Unsafe only', 'If that square is marked X, the opponent is protected.'],
        ['Return home', 'A cut piece goes back to its owner’s home pile and must enter again with Dayam.'],
      ],
    },
    finish: {
      kicker: '06',
      title: 'Finish at the center',
      body:
        'After a piece completes its lap, it turns toward the player’s home path and must reach the center by exact count. First to bring every piece home wins.',
      tipsTitle: 'Beginner tactics',
      tips: [
        'Try to keep at least one piece near a safe X while another piece hunts.',
        'Use bonus-roll sequences to enter a new piece and move an older piece in the same turn.',
        'When an opponent is close behind, spend small throws to land on safety instead of racing blindly.',
      ],
      detailTitle: 'Finishing rules',
      details: [
        ['Complete the lap', 'A piece must travel the outer path before taking the inward home lane.'],
        ['Exact count', 'You cannot overshoot the center. Wait for the exact score needed.'],
        ['All pieces', 'The winner is the first player or team to bring all required pieces to the center.'],
      ],
    },
    strategy: {
      kicker: '07',
      title: 'Win with odds and timing',
      body:
        'Dayaakattai feels chaotic, but the odds create clear pressure points: entering pieces, chaining bonus throws, choosing safe X squares, and timing cuts.',
      probabilityTitle: 'Throw statistics',
      probabilities: [
        ['Dayam entry', '12.5%', '0 + 1 or 1 + 0. Needed to bring a piece out.'],
        ['Bonus roll', '37.5%', '1, 5, 6, or 12 lets the same player throw again.'],
        ['No bonus', '62.5%', '2, 3, or 4 ends the throwing run.'],
        ['Average score', '3.75', 'Average value of one stick throw, counting 0 + 0 as 12.'],
      ],
      winTitle: 'How to win more often',
      win: [
        ['Open two threats', 'Do not move only one piece. A single runner is easy to chase; two active pieces let you use mixed scores.'],
        ['Treat Dayam as tempo', 'When a bonus chain starts with Dayam, enter a piece and use later scores to move a different piece.'],
        ['Park with purpose', 'Safe X squares are not just defense. They are launch pads for cuts on the next throw.'],
        ['Respect exact finish', 'Near the center, smaller numbers matter. Avoid rushing all pieces into awkward waiting positions.'],
      ],
      challengeTitle: 'Statistical challenges',
      challenges: [
        ['Entry bottleneck', 'Only 2 of 16 equally likely stick outcomes are Dayam, so unentered pieces are your slowest resource.'],
        ['Bonus-chain risk', 'Bonus rolls are powerful, but most rolls still end the sequence. Plan moves that work even if the next throw stops.'],
        ['Cut value', 'A cut is strongest when it sends an advanced enemy home, not when it only removes a fresh piece near entry.'],
      ],
    },
    history: {
      kicker: '08',
      title: 'History and evolution',
      body:
        'Dayakattai belongs to Tamil Nadu’s traditional family of dice-and-race games. The exact first date is not firmly documented, but the game has been carried through household play, floor drawings, local variants, and modern revivals.',
      timeline: [
        ['Ancient roots', 'Indian race games using chance and movement are old, and the wider Pachisi family is often discussed alongside epic dice-play traditions.'],
        ['Tamil household play', 'Dayakattai became a Tamil Nadu home and community game: chalk or floor grids, long brass or wooden sticks, and everyday objects as pieces.'],
        ['Local variants', 'Boards, piece counts, safe-square patterns, and paired-piece rules vary by family and region. That is why visual layout matters.'],
        ['Modern revival', 'Today it appears in videos, apps, printed boards, school activities, and culture projects that preserve traditional games.'],
      ],
      whyTitle: 'Why it is good',
      why: [
        ['Math without worksheets', 'Players practice counting, probability, exact movement, and risk comparison naturally.'],
        ['Social memory', 'The board can be drawn anywhere, so rules travel through people rather than equipment.'],
        ['Luck plus judgment', 'Throws decide opportunity; good players decide which opportunity is worth taking.'],
      ],
    },
    source: 'This project is open source.',
  },
  ta: {
    code: 'TA',
    label: 'தமிழ்',
    title: 'தாயம் வழிகாட்டி',
    eyebrow: 'தாயக்கட்டை என்றும் அழைக்கப்படுகிறது',
    intro:
      'கட்டம் வரைவது, தாயக்கட்டை வீச்சு, காய் இறக்குதல், வெட்டுதல், பாதுகாப்பு X இடங்கள், சரியான முடிவு ஆகியவற்றை சில நிமிடங்களில் கற்றுக்கொள்ளுங்கள்.',
    alias: 'Dayaakattai என்பது தாயம் விளையாட்டின் மற்றொரு பொதுவான பெயர்.',
    cta: 'அமைப்பில் தொடங்கு',
    nav: [
      ['setup', 'அமைப்பு'],
      ['throws', 'தாயம்'],
      ['turn', 'சுற்று'],
      ['route', 'பாதை'],
      ['capture', 'வெட்டு'],
      ['finish', 'முடிவு'],
      ['strategy', 'யுக்தி'],
      ['history', 'வரலாறு'],
    ],
    stats: [
      ['ஆட்கள்', '2-4'],
      ['கட்டைகள்', '2'],
      ['காய்கள்', '6 அல்லது 12'],
      ['X இடங்கள்', '9'],
    ],
    setup: {
      kicker: '01',
      title: 'கட்டம் வரைந்து அமைக்கவும்',
      body:
        'வீடியோவில் காட்டப்பட்ட முறை தாயக்கட்டை பாணி: தரையில் சாக்பீஸால் கட்டம் வரைந்து, பாதுகாப்பு இடங்களை X ஆக குறிக்கவும்; காய்களை பலகைக்கு வெளியே வீட்டுக் குவியலில் வைத்துத் தொடங்கவும்.',
      notes: [
        'காசு, பட்டன், கல், சோழி போன்ற சிறிய பொருட்களை காய்களாகப் பயன்படுத்தலாம்.',
        'ஒவ்வொரு வீரரும் பொதுவாக 6 அல்லது 12 காய்களுடன் தொடங்குவார்.',
        'X குறியிட்ட இடங்களில் இருக்கும் காய்களை வெட்ட முடியாது.',
      ],
      detailsTitle: 'எதை வரைய வேண்டும்',
      details: [
        ['கட்டம்', '7 x 7 சதுரக் கட்டத்தை தெளிவாக வரையுங்கள். வீடியோவில் தரையில் சாக்பீஸ் பயன்படுத்தப்படுகிறது.'],
        ['பாதுகாப்பு', 'படத்தில் இருக்கும் வைரம் போன்ற அமைப்பில் ஒன்பது சதுரங்களில் பெரிய X குறி போடுங்கள்.'],
        ['வீடு', 'ஒவ்வொரு வீரரின் காய்களையும் பலகைக்கு வெளியே தனி குவியலாக வைத்திருங்கள்.'],
        ['தொடக்கம்', 'ஒவ்வொருவரின் தொடக்கப் பக்கத்தை நினைவில் வைக்க சிறிய நிறக் குறிகள் வைக்கலாம்.'],
      ],
    },
    throws: {
      kicker: '02',
      title: 'தாயக்கட்டை மதிப்பை படிக்கவும்',
      body:
        'இரண்டு நீளமான கட்டைகளை வீசுங்கள். ஒவ்வொரு கட்டையிலும் 0, 1, 2, அல்லது 3 வரும். இரண்டு மதிப்புகளையும் சேர்க்கவும்; ஆனால் 0 + 0 வந்தால் அது 12.',
      table: [
        ['0 + 0', '12'],
        ['0 + 1', '1 / தாயம்'],
        ['1 + 3', '4'],
        ['2 + 3', '5'],
        ['3 + 3', '6'],
      ],
      simulator: 'கட்டை வீசு',
      result: 'மதிப்பு',
      bonus: '1, 5, 6, அல்லது 12 வந்தால் மீண்டும் வீசலாம்.',
      die: 'கட்டை',
      matrixTitle: 'எல்லா கட்டை மதிப்புகள்',
      matrixHeader: ['கட்டை 1 / கட்டை 2', '0', '1', '2', '3'],
      matrix: [
        ['0', '12', '1', '2', '3'],
        ['1', '1', '2', '3', '4'],
        ['2', '2', '3', '4', '5'],
        ['3', '3', '4', '5', '6'],
      ],
    },
    turn: {
      kicker: '03',
      title: 'ஒரு சுற்றை ஆடவும்',
      body:
        'வீசி, கூடுதல் வீச்சுகள் இருந்தால் அவற்றையும் சேர்த்துக் கொள்ளுங்கள். ஒவ்வொரு காயையும் வீட்டிலிருந்து இறக்க தாயம் வேண்டும்.',
      steps: [
        ['வீசு', '1, 5, 6, 12 வந்தால் இன்னொரு வீச்சு கிடைக்கும்.'],
        ['இறக்கு', '0 + 1 ஆக வரும் தாயம் ஒரு காயை வீட்டுக் குவியலிலிருந்து வெளியே கொண்டு வரும்.'],
        ['நகர்', 'வந்த மதிப்புகளை ஒரே காய்க்கோ பல காய்களுக்கோ பகிர்ந்து நகர்த்தலாம்.'],
        ['தீர்த்து வை', 'பாதுகாப்பற்ற இடத்தில் எதிரியை வெட்டு; X இடத்தை மதித்து, சரியான எண்ணிக்கையால் முடி.'],
      ],
      exampleTitle: 'ஒரு எடுத்துக்காட்டு சுற்று',
      example: [
        ['0 + 1 = 1', 'தாயம்: ஒரு காயை இறக்கி மீண்டும் வீசுங்கள்.'],
        ['2 + 3 = 5', 'கூடுதல் வீச்சு மதிப்பு: அதை வைத்துக் கொண்டு மீண்டும் வீசுங்கள்.'],
        ['0 + 0 = 12', 'கூடுதல் வீச்சு மதிப்பு: அதை வைத்துக் கொண்டு மீண்டும் வீசுங்கள்.'],
        ['0 + 2 = 2', 'கூடுதல் வீச்சு இல்லை: இப்போது 1, 5, 12, 2 ஆகியவற்றை சட்டப்படி பயன்படுத்துங்கள்.'],
      ],
    },
    route: {
      kicker: '04',
      title: 'கட்டத்தைப் புரிந்துகொள்ளவும்',
      body:
        'வீடியோவில் இருக்கும் பலகை 7 x 7 சாக்பீஸ் கட்டம். காய்கள் வெளிப்பாதையில் சுற்றி, பிறகு மைய வீட்டை நோக்கி உள்ளே திரும்புகின்றன. X குறியிட்ட இடங்கள் பாதுகாப்பு.',
      controls: ['தெற்கு', 'மேற்கு', 'வடக்கு', 'கிழக்கு'],
      hint: 'வீரரைத் தேர்ந்தெடுத்து தொடக்கப் பக்கம் மற்றும் முடிவுப் பாதையை மாற்றிப் பாருங்கள்.',
      home: 'மனை',
      safe: 'X பாதுகாப்பு',
      detailsTitle: 'இந்த வரைபடம் காட்டுவது',
      details: [
        ['வெளிப்பாதை', 'நிறமிட்ட பாதை முதலில் 7 x 7 கட்டத்தின் வெளிப்புறம் சுற்றுகிறது.'],
        ['உள்ளே திருப்பு', 'சுற்று முடிந்தபின் பாதை மையப் பாதைக்குள் திரும்புகிறது.'],
        ['X பாதுகாப்பு', 'ஒன்பது X குறிகள் வைரம் போன்ற அமைப்பில் இருக்கும்: மேல் ஒன்று, நடுவில் மூன்று, கீழ் ஒன்று, இருபுற சாய்வு ஜோடிகள்.'],
        ['திருப்பு', 'அதே பாதை விதி ஒவ்வொரு வீரரின் பக்கத்திற்கும் திருப்பிப் பயன்படுத்தப்படுகிறது.'],
      ],
    },
    capture: {
      kicker: '05',
      title: 'கவனமாக வெட்டவும்',
      body:
        'எதிரியின் காய் இருக்கும் பாதுகாப்பற்ற இடத்தில் உங்கள் காய் இறங்கினால் அது வெட்டப்பட்டு மீண்டும் வீட்டிற்கு செல்கிறது. X குறியிட்ட இடங்கள் வெட்டிலிருந்து காப்பாற்றும்.',
      rules: [
        ['X பாதுகாப்பு', 'X குறியிட்ட இடத்தில் இருக்கும் காயை எதிரி வெட்ட முடியாது.'],
        ['வீச்சு பகிர்வு', '5, 12, 2 போன்ற தொடர் வீச்சுகளை பல காய்களுக்கு பகிரலாம் அல்லது ஒரே காய்க்கு சேர்க்கலாம்.'],
        ['ஜோடி முறை', 'சில நீளமான ஆட்டங்களில் ஜோடி காய்கள் இருக்கும்; அவை இரட்டைப்படை மதிப்புகளில் மட்டும் நகரும்.'],
      ],
      detailTitle: 'வெட்டும் முன் பார்க்கவும்',
      detailRules: [
        ['அதே இடம்', 'எதிரியின் காய் இருக்கும் அதே சதுரத்தில் சரியாக இறங்கினால் மட்டுமே வெட்டு.'],
        ['பாதுகாப்பற்ற இடம்', 'அந்த சதுரத்தில் X இருந்தால் எதிரி பாதுகாப்பாக இருப்பார்.'],
        ['மீண்டும் வீடு', 'வெட்டப்பட்ட காய் வீட்டுக் குவியலுக்கு திரும்பி, மீண்டும் தாயம் வந்தால் மட்டுமே இறங்கும்.'],
      ],
    },
    finish: {
      kicker: '06',
      title: 'மையத்தில் முடிக்கவும்',
      body:
        'ஒரு காய் சுற்றை முடித்த பிறகு, தன் வீட்டுப் பாதையில் மையத்தை நோக்கி செல்கிறது. மையத்தை சரியான மதிப்பால் மட்டுமே அடைய வேண்டும். எல்லா காய்களையும் மையத்துக்கு கொண்டுவருபவர் வெற்றி.',
      tipsTitle: 'தொடக்க யுக்திகள்',
      tips: [
        'ஒரு காயை X பாதுகாப்பு இடத்துக்கு அருகில் வைத்துக்கொண்டு இன்னொரு காயால் வெட்ட முயலுங்கள்.',
        'கூடுதல் வீச்சு தொடரில் புதிய காயை இறக்கியும் பழைய காயை நகர்த்தியும் பயன் பெறுங்கள்.',
        'எதிரி அருகில் இருந்தால் வேகமாக ஓடுவதற்குப் பதில் பாதுகாப்பு இடத்தில் நிற்க முயலுங்கள்.',
      ],
      detailTitle: 'முடிவு விதிகள்',
      details: [
        ['சுற்றை முடி', 'காய் உள்ளே செல்லும் முன் வெளிப்பாதை சுற்றை முடிக்க வேண்டும்.'],
        ['சரியான மதிப்பு', 'மையத்தை தாண்டிச் செல்ல முடியாது. தேவையான சரியான மதிப்பு வரும் வரை காத்திருக்க வேண்டும்.'],
        ['எல்லா காய்களும்', 'தேவையான எல்லா காய்களையும் மையத்துக்கு கொண்டு வருபவர் அல்லது அணி வெற்றி.'],
      ],
    },
    strategy: {
      kicker: '07',
      title: 'வாய்ப்பும் நேரமும் வைத்து வெல்லுங்கள்',
      body:
        'தாயக்கட்டை குழப்பமாகத் தோன்றினாலும் வாய்ப்புகள் சில முக்கிய இடங்களை உருவாக்குகின்றன: காயை இறக்குதல், கூடுதல் வீச்சு தொடர், X பாதுகாப்பு இடம், வெட்டும் நேரம்.',
      probabilityTitle: 'வீச்சு புள்ளிவிவரம்',
      probabilities: [
        ['தாயம் இறக்கம்', '12.5%', '0 + 1 அல்லது 1 + 0. காயை வெளியே கொண்டு வர இதுவே தேவை.'],
        ['கூடுதல் வீச்சு', '37.5%', '1, 5, 6, அல்லது 12 வந்தால் மீண்டும் வீசலாம்.'],
        ['கூடுதல் இல்லை', '62.5%', '2, 3, அல்லது 4 வந்தால் வீச்சுத் தொடர் முடியும்.'],
        ['சராசரி மதிப்பு', '3.75', '0 + 0-ஐ 12 ஆகக் கணக்கிட்டால் ஒரு வீச்சின் சராசரி மதிப்பு.'],
      ],
      winTitle: 'அதிகமாக வெல்லும் யுக்திகள்',
      win: [
        ['இரண்டு அச்சுறுத்தல்', 'ஒரே காயை மட்டும் ஓட்டாதீர்கள். இரண்டு காய்கள் ஆட்டத்தில் இருந்தால் வந்த மதிப்புகளை நன்றாகப் பகிரலாம்.'],
        ['தாயம் ஒரு வேகம்', 'கூடுதல் வீச்சு தொடர் தாயத்துடன் தொடங்கினால், ஒரு காயை இறக்கி பிற மதிப்புகளால் வேறு காயை நகர்த்தலாம்.'],
        ['பாதுகாப்பை ஆயுதமாக்கு', 'X இடம் பாதுகாப்பு மட்டுமல்ல. அடுத்த வீச்சில் வெட்டத் தயாராக நிற்கும் இடம்.'],
        ['சரியான முடிவை மதிக்கவும்', 'மையத்திற்கு அருகில் சிறிய மதிப்புகள் முக்கியம். எல்லா காய்களையும் சிக்கலான காத்திருப்பு இடத்தில் நிறுத்தாதீர்கள்.'],
      ],
      challengeTitle: 'புள்ளிவிவர சவால்கள்',
      challenges: [
        ['இறக்கம் மெதுவானது', '16 வாய்ப்புகளில் 2 வாய்ப்புகள் மட்டுமே தாயம். வெளியே வராத காய்கள்தான் மிக மெதுவான வளம்.'],
        ['கூடுதல் வீச்சு ஆபத்து', 'கூடுதல் வீச்சு வலிமையானது; ஆனால் பெரும்பாலான வீச்சுகள் தொடரை முடிக்கும். அடுத்த வீச்சு நிறுத்தினாலும் பயன் தரும் நகர்வைத் தேர்வுசெய்யுங்கள்.'],
        ['வெட்டு மதிப்பு', 'புதிய காயை வெட்டுவதைவிட, தூரம் சென்ற எதிரி காயை வீட்டிற்கு அனுப்புவது பெரிய பலன்.'],
      ],
    },
    history: {
      kicker: '08',
      title: 'வரலாறும் வளர்ச்சியும்',
      body:
        'தாயக்கட்டை தமிழ்நாட்டின் பாரம்பரிய பகடை-ஓட்ட விளையாட்டு குடும்பத்தைச் சேர்ந்தது. தொடங்கிய சரியான ஆண்டு உறுதியாக ஆவணப்படவில்லை; ஆனால் வீட்டு விளையாட்டு, தரை கட்டம், உள்ளூர் மாறுபாடு, நவீன மறுமலர்ச்சி வழியாக இது தொடர்கிறது.',
      timeline: [
        ['பழமையான வேர்கள்', 'வாய்ப்பும் நகர்வும் சேர்ந்த இந்திய ஓட்ட விளையாட்டுகள் பழமையானவை; பச்சிசி குடும்பமும் காவிய பகடை மரபுகளுடனும் அடிக்கடி தொடர்புபடுத்தப்படுகிறது.'],
        ['தமிழ் வீட்டு விளையாட்டு', 'தாயக்கட்டை தமிழ்நாட்டில் வீடு மற்றும் சமூக விளையாட்டாக வளர்ந்தது: சாக்பீஸ் கட்டம், நீளமான பித்தளை/மரக் கட்டைகள், எளிய காய்கள்.'],
        ['உள்ளூர் மாறுபாடுகள்', 'கட்டம், காய் எண்ணிக்கை, X இடங்கள், ஜோடி காய் விதி ஆகியவை குடும்பம் மற்றும் இடத்துக்கு ஏற்ப மாறலாம். அதனால் காட்சி அமைப்பு முக்கியம்.'],
        ['நவீன மறுமலர்ச்சி', 'இப்போது வீடியோ, ஆப், அச்சுப் பலகை, பள்ளி செயல்பாடு, பாரம்பரிய விளையாட்டு திட்டங்கள் மூலம் மீண்டும் பரவுகிறது.'],
      ],
      whyTitle: 'ஏன் இது நல்ல விளையாட்டு',
      why: [
        ['கணக்கு இயல்பாக வரும்', 'எண்ணிக்கை, வாய்ப்பு, சரியான நகர்வு, ஆபத்து ஒப்பீடு ஆகியவை பாடம் போல இல்லாமல் ஆட்டத்திலேயே பயிற்சி பெறுகின்றன.'],
        ['சமூக நினைவு', 'பலகையை எங்கும் வரையலாம்; எனவே விதிகள் பொருள்களைக் காட்டிலும் மனிதர்கள் வழியாகப் பரவுகின்றன.'],
        ['அதிர்ஷ்டமும் தீர்மானமும்', 'வீச்சு வாய்ப்பை தரும்; நல்ல வீரர் எந்த வாய்ப்பை பயன்படுத்துவது என்று தீர்மானிப்பார்.'],
      ],
    },
    source: 'இந்த திட்டம் open source ஆக உள்ளது.',
  },
}

const BOARD_SIZE = 7
const BOARD_MAX = BOARD_SIZE - 1

const southPath = [
  [3, 6],
  [4, 6],
  [5, 6],
  [6, 6],
  [6, 5],
  [6, 4],
  [6, 3],
  [6, 2],
  [6, 1],
  [6, 0],
  [5, 0],
  [4, 0],
  [3, 0],
  [2, 0],
  [1, 0],
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [1, 6],
  [2, 6],
  [3, 5],
  [3, 4],
  [3, 3],
]

const players = [
  { key: 'south', color: '#c5432f', rotate: 0 },
  { key: 'west', color: '#277f62', rotate: 90 },
  { key: 'north', color: '#2e5fa8', rotate: 180 },
  { key: 'east', color: '#986a16', rotate: 270 },
]

const safeSquares = new Set([
  '2,0',
  '1,1',
  '5,1',
  '0,3',
  '3,3',
  '6,3',
  '1,5',
  '5,5',
  '3,6',
])

function rotatePoint([x, y], deg) {
  if (deg === 90) return [y, BOARD_MAX - x]
  if (deg === 180) return [BOARD_MAX - x, BOARD_MAX - y]
  if (deg === 270) return [BOARD_MAX - y, x]
  return [x, y]
}

function getInitialLanguage() {
  const params = new URLSearchParams(window.location.search)
  return params.get('lang') === 'ta' ? 'ta' : 'en'
}

function App() {
  const [lang, setLang] = useState(getInitialLanguage)
  const [activePlayer, setActivePlayer] = useState(0)
  const [activeId, setActiveId] = useState('top')
  const [activeStep, setActiveStep] = useState(0)
  const [diceState, setDiceState] = useState([0, 1])
  const [rollKey, setRollKey] = useState(0)
  const t = copy[lang]
  const active = players[activePlayer]
  const routePath = useMemo(
    () => southPath.map((point) => rotatePoint(point, active.rotate)),
    [active.rotate],
  )
  const score = diceState[0] === 0 && diceState[1] === 0 ? 12 : diceState[0] + diceState[1]
  const isBonus = [1, 5, 6, 12].includes(score)

  useEffect(() => {
    const sections = ['top', ...t.nav.map(([id]) => id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-34% 0px -54% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [t.nav])

  useEffect(() => {
    if (!window.location.hash) return
    window.requestAnimationFrame(() => {
      document
        .getElementById(window.location.hash.slice(1))
        ?.scrollIntoView({ block: 'start' })
    })
  }, [lang])

  function changeLanguage(nextLang) {
    setLang(nextLang)
    const url = new URL(window.location.href)
    url.searchParams.set('lang', nextLang)
    window.history.replaceState({}, '', url)
  }

  function rollSticks() {
    setDiceState([
      Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 4),
    ])
    setRollKey((key) => key + 1)
  }

  return (
    <div className="app-shell" lang={lang === 'ta' ? 'ta' : 'en'}>
      <aside className="side-nav" aria-label="Guide sections">
        <a className="brand-mark" href="#top" aria-label={t.title}>
          <span className="brand-board">தா</span>
          <span>
            <strong>thaayam-guide</strong>
            <small>{t.eyebrow}</small>
          </span>
        </a>
        <nav>
          {t.nav.map(([id, label]) => (
            <a className={activeId === id ? 'is-active' : ''} key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="language-card" aria-label="Language">
          <Languages size={18} aria-hidden="true" />
          <div className="segmented">
            {Object.entries(copy).map(([key, value]) => (
              <button
                className={lang === key ? 'is-active' : ''}
                key={key}
                onClick={() => changeLanguage(key)}
                type="button"
              >
                {value.code}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main>
        <section className="hero-section" id="top">
          <div className="hero-copy reveal-panel">
            <div className="eyebrow">{t.eyebrow}</div>
            <h1>{t.title}</h1>
            <div className="alias-line">{t.alias}</div>
            <p>{t.intro}</p>
            <div className="hero-actions">
              <a className="primary-link" href="#setup">
                <MoveRight size={18} aria-hidden="true" />
                {t.cta}
              </a>
              <div className="language-inline">
                {Object.entries(copy).map(([key, value]) => (
                  <button
                    className={lang === key ? 'is-active' : ''}
                    key={key}
                    onClick={() => changeLanguage(key)}
                    type="button"
                  >
                    {value.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <BoardGuide
            active={active}
            activeStep={activeStep}
            activePlayer={activePlayer}
            routePath={routePath}
            setActivePlayer={setActivePlayer}
            t={t}
          />
        </section>

        <section className="stat-strip reveal-panel" aria-label="Game facts">
          {t.stats.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </section>

        <GuideSection id="setup" icon={UsersRound} section={t.setup}>
          <ul className="check-list">
            {t.setup.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <DetailGrid title={t.setup.detailsTitle} items={t.setup.details} />
        </GuideSection>

        <GuideSection id="throws" icon={Dices} section={t.throws}>
          <div className="throw-panel reveal-panel">
            <div className="throw-table">
              {t.throws.table.map(([showing, value]) => (
                <div key={showing}>
                  <span>{showing}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <div className="stick-sim">
              <div className="sticks" aria-label={`${t.throws.result}: ${score}`} key={rollKey}>
                {diceState.map((value, index) => (
                  <span className={`stick-face face-${value}`} key={`${index}-${value}`}>
                    <small>{t.throws.die} {index + 1}</small>
                    <b>{value}</b>
                  </span>
                ))}
              </div>
              <button type="button" onClick={rollSticks}>
                <Dices size={18} aria-hidden="true" />
                {t.throws.simulator}
              </button>
              <p>
                {t.throws.result}: <strong>{score}</strong>
              </p>
              <em className={isBonus ? 'is-live' : ''}>{t.throws.bonus}</em>
            </div>
          </div>
          <DiceMatrix title={t.throws.matrixTitle} header={t.throws.matrixHeader} rows={t.throws.matrix} />
        </GuideSection>

        <GuideSection id="turn" icon={Route} section={t.turn}>
          <div className="flow-grid reveal-panel">
            {t.turn.steps.map(([title, body], index) => (
              <article
                className={activeStep === index ? 'is-active' : ''}
                key={title}
                onMouseEnter={() => setActiveStep(index)}
                onFocus={() => setActiveStep(index)}
                tabIndex={0}
              >
                <span>{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <ExampleTimeline title={t.turn.exampleTitle} items={t.turn.example} />
        </GuideSection>

        <GuideSection id="route" icon={Flag} section={t.route}>
          <div className="wide-board">
            <BoardGuide
              active={active}
              activeStep={activeStep}
              activePlayer={activePlayer}
              routePath={routePath}
              setActivePlayer={setActivePlayer}
              t={t}
            />
          </div>
          <DetailGrid title={t.route.detailsTitle} items={t.route.details} />
        </GuideSection>

        <GuideSection id="capture" icon={Swords} section={t.capture}>
          <div className="rule-grid reveal-panel">
            {t.capture.rules.map(([title, body]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <DetailGrid title={t.capture.detailTitle} items={t.capture.detailRules} />
        </GuideSection>

        <GuideSection id="finish" icon={ShieldCheck} section={t.finish}>
          <div className="tips-block">
            <h3>{t.finish.tipsTitle}</h3>
            <ul>
              {t.finish.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
          <DetailGrid title={t.finish.detailTitle} items={t.finish.details} />
        </GuideSection>

        <GuideSection id="strategy" icon={Trophy} section={t.strategy}>
          <ProbabilityPanel title={t.strategy.probabilityTitle} items={t.strategy.probabilities} />
          <DetailGrid title={t.strategy.winTitle} items={t.strategy.win} />
          <DetailGrid title={t.strategy.challengeTitle} items={t.strategy.challenges} />
        </GuideSection>

        <GuideSection id="history" icon={Landmark} section={t.history}>
          <HistoryTimeline items={t.history.timeline} />
          <WhyPanel title={t.history.whyTitle} items={t.history.why} />
        </GuideSection>

        <footer>
          <strong>thaayam-guide</strong>
          <span>Thaayam / Dayaakattai</span>
          <span>{t.source}</span>
          <a href="https://github.com/Amal-David/thaayam-guide" rel="noreferrer" target="_blank">
            GitHub
          </a>
        </footer>
      </main>
    </div>
  )
}

function DetailGrid({ items, title }) {
  return (
    <div className="detail-block reveal-panel">
      <h3>{title}</h3>
      <div className="detail-grid" style={{ '--detail-columns': Math.min(items.length, 4) }}>
        {items.map(([label, body]) => (
          <article key={label}>
            <strong>{label}</strong>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

function DiceMatrix({ header, rows, title }) {
  return (
    <div className="matrix-block reveal-panel">
      <h3>{title}</h3>
      <div className="dice-matrix" role="table" aria-label={title}>
        {header.map((cell) => (
          <strong className="matrix-head" key={cell} role="columnheader">
            {cell}
          </strong>
        ))}
        {rows.flatMap((row) =>
          row.map((cell, index) =>
            index === 0 ? (
              <strong className="matrix-head" key={`${row[0]}-${index}`} role="rowheader">
                {cell}
              </strong>
            ) : (
              <span className={[1, 5, 6, 12].includes(Number(cell)) ? 'is-bonus' : ''} key={`${row[0]}-${index}`}>
                {cell}
              </span>
            ),
          ),
        )}
      </div>
    </div>
  )
}

function ExampleTimeline({ items, title }) {
  return (
    <div className="example-block reveal-panel">
      <h3>{title}</h3>
      <div className="example-timeline">
        {items.map(([label, body]) => (
          <article key={label}>
            <strong>{label}</strong>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

function ProbabilityPanel({ items, title }) {
  return (
    <div className="probability-block reveal-panel">
      <h3>{title}</h3>
      <div className="probability-grid">
        {items.map(([label, value, body]) => (
          <article key={label}>
            <Percent size={18} aria-hidden="true" />
            <strong>{value}</strong>
            <span>{label}</span>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

function HistoryTimeline({ items }) {
  return (
    <div className="history-timeline reveal-panel">
      {items.map(([title, body], index) => (
        <article key={title}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <div>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

function WhyPanel({ items, title }) {
  return (
    <div className="why-block reveal-panel">
      <h3>{title}</h3>
      <div>
        {items.map(([label, body]) => (
          <article key={label}>
            <Brain size={20} aria-hidden="true" />
            <strong>{label}</strong>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

function GuideSection({ children, icon: Icon, id, section }) {
  return (
    <section className="guide-section" id={id}>
      <div className="section-heading">
        <div className="section-icon">
          <Icon size={22} aria-hidden="true" />
        </div>
        <div>
          <span>{section.kicker}</span>
          <h2>{section.title}</h2>
          <p>{section.body}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

function BoardGuide({ active, activePlayer, activeStep, routePath, setActivePlayer, t }) {
  const unit = 100 / BOARD_SIZE
  const centers = routePath.map(([x, y]) => [x * unit + unit / 2, y * unit + unit / 2])
  const routePoints = centers.map(([x, y]) => `${x},${y}`).join(' ')

  return (
    <div className="board-card" style={{ '--player': active.color }}>
      <div className="board-topline">
        <div>
          <strong>{t.route.title}</strong>
          <span>{t.route.hint}</span>
        </div>
        <div className="player-tabs">
          {players.map((player, index) => (
            <button
              aria-label={t.route.controls[index]}
              className={activePlayer === index ? 'is-active' : ''}
              key={player.key}
              onClick={() => setActivePlayer(index)}
              style={{ '--tab': player.color }}
              type="button"
            >
              {t.route.controls[index]}
            </button>
          ))}
        </div>
      </div>

      <div className="board-wrap">
        <div className="game-board" aria-label="Dayaakattai 7 by 7 board">
          {players.map((player, index) => (
            <i
              aria-hidden="true"
              className={`start-mark start-${player.key} ${activePlayer === index ? 'is-active' : ''}`}
              key={player.key}
              style={{ '--mark': player.color }}
            />
          ))}
          {Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => {
            const x = index % BOARD_SIZE
            const y = Math.floor(index / BOARD_SIZE)
            const key = `${x},${y}`
            const pathIndex = routePath.findIndex(([px, py]) => px === x && py === y)
            const isHome = key === '3,3'
            const isSafe = safeSquares.has(key)
            const isMarker =
              (activeStep === 1 && pathIndex === 0) ||
              (activeStep === 2 && [5, 11, 17].includes(pathIndex)) ||
              (activeStep === 3 && pathIndex === routePath.length - 1)

            return (
              <div
                className={[
                  'cell',
                  isHome ? 'is-home' : '',
                  isSafe ? 'is-safe' : '',
                  pathIndex > -1 ? 'is-path' : '',
                  isMarker ? 'is-marker' : '',
                ].join(' ')}
                key={key}
              >
                {isHome && <span>{t.route.home}</span>}
                {pathIndex > -1 && <b>{pathIndex + 1}</b>}
              </div>
            )
          })}
          <svg viewBox="0 0 100 100" className="route-line" aria-hidden="true" key={routePoints}>
            <polyline points={routePoints} />
          </svg>
        </div>
        <div className="piece-rail" aria-hidden="true">
          {players.map((player, index) => (
            <div className={index === activePlayer ? 'is-active' : ''} key={player.key}>
              {Array.from({ length: 6 }, (_, dot) => (
                <span key={dot} style={{ background: player.color }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
