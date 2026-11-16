/* Small, local vocabulary for real-life questions; no network or query storage. */
const searchConcepts=[
 {terms:['咖啡','咖啡渍','茶渍','茶水','果汁','色渍'],ids:['coffee','stains'],suggest:['咖啡渍','油渍','洗护标签']},
 {terms:['油渍','油滴','辣油','食用油','油沾衣服','衣服沾油'],ids:['oil','stains'],suggest:['油渍','奶渍','洗护标签']},
 {terms:['牛奶保存','牛奶冷藏','牛奶保质期','牛奶存放'],ids:['fridge','storage']},
 {terms:['奶渍','牛奶','奶洒'],ids:['milk-stain','stains']},
 {terms:['泥巴','泥渍','沾泥','裤脚泥'],ids:['mud-stain']},
 {terms:['汽油','燃油'],ids:['fuel-clothes']},
 {terms:['洗护标签','衣服标签','水洗标','洗衣标'],ids:['labels']},
 {terms:['洗衣液','洗涤剂'],ids:['detergent','supplies']},
 {terms:['毛衣','针织衫','羊毛衫'],ids:['knit','wardrobe']},
 {terms:['芒果','mango'],ids:['mango']},
 {terms:['菠萝','凤梨'],ids:['pineapple']},
 {terms:['石榴'],ids:['pomegranate']},
 {terms:['西瓜'],ids:['watermelon-cut']},
 {terms:['哈密瓜','甜瓜'],ids:['melon-cut']},
 {terms:['猕猴桃','奇异果'],ids:['kiwi-cut']},
 {terms:['火龙果'],ids:['dragonfruit-cut']},
 {terms:['柚子'],ids:['pomelo-peel']},
 {terms:['桃子','桃核'],ids:['peach-slice']},
 {terms:['牛油果','鳄梨'],ids:['avocado']},
 {terms:['小龙虾'],ids:['crayfish']},
 {terms:['螃蟹','蟹壳','剥蟹'],ids:['crab']},
 {terms:['剥虾','虾壳','熟虾'],ids:['shrimp-peel']},
 {terms:['水垢','白色硬垢','除垢'],ids:['scale']},
 {terms:['油烟机','灶台','厨房油污','油膜'],ids:['grease']},
 {terms:['镜子','镜面','擦玻璃'],ids:['mirror-clean']},
 {terms:['键盘','键帽'],ids:['keyboard-clean']},
 {terms:['吸尘器','滤网','滤芯'],ids:['vacuum-filter']},
 {terms:['瓷砖缝','美缝','填缝','密封胶'],ids:['tile-seams']},
 {terms:['抽屉','分隔盒'],ids:['drawer-zones']},
 {terms:['床单','被套','床品','枕套'],ids:['linen-sets']},
 {terms:['包包','包袋','背包'],ids:['bag-storage']},
 {terms:['清洁用品','清洁工具','工具篮'],ids:['cleaning-kit']},
 {terms:['充电线','数据线','电线','理线'],ids:['cables']},
 {terms:['行李','行李箱','旅行打包'],ids:['packing']},
 {terms:['剩饭','米饭保存'],ids:['rice-leftovers']},
 {terms:['水煮蛋','煮熟鸡蛋','熟鸡蛋'],ids:['boiled-eggs']},
 {terms:['解冻','冻肉','化冻'],ids:['thaw']},
 {terms:['备菜','生熟分开'],ids:['prep']},
 {terms:['保质期','到期','囤货'],ids:['storage','supplies']}
];
const normalizeSearch=s=>String(s??'').normalize('NFKC').toLowerCase().replace(/[\s\p{P}\p{S}]+/gu,'');
const searchFiller=/怎么|怎样|如何|怎么办|能不能|可以|应该|需要|一下|请问|我的|这个|那个|什么|为什么|多少钱|价格|怎么卖|一斤|一瓶|洒在|洒到|沾在|沾到|弄到|弄脏|衣服上|衣物上|上面|干净|处理|清洗|去除|切法|方法|技巧/g;
function questionTokens(query){
 const q=normalizeSearch(query),plain=q.replace(searchFiller,' ');
 const segmenter=typeof Intl.Segmenter==='function'?new Intl.Segmenter('zh-CN',{granularity:'word'}):null;
 const parts=segmenter?[...segmenter.segment(plain)].filter(x=>x.isWordLike).map(x=>x.segment):plain.split(/\s+/);
 return [...new Set(parts.filter(x=>x.length>=2))];
}
function matchedSearchConcepts(query){
 const q=normalizeSearch(query),compact=q.replace(searchFiller,'');
 return searchConcepts.filter(c=>{
  if(!c.terms.some(t=>q.includes(normalizeSearch(t))||compact.includes(normalizeSearch(t))))return false;
  const stain=/(衣|裤|裙|渍|洒|沾)/.test(q);
  if(c.ids[0]==='milk-stain'&&!stain&&/(保存|保质期|冰箱|冷藏|冷冻|存放|放多久)/.test(q))return false;
  if(c.ids[0]==='coffee'&&!stain&&/(冲泡|咖啡机|磨豆|饮用|保存)/.test(q))return false;
  if(c.ids[0]==='oil'&&!stain&&/(厨房|灶台|油烟)/.test(q))return false;
  return true;
 });
}
function guideSearchScore(n,query){
 const q=normalizeSearch(query);if(!q)return 1;
 if(/(咖啡机|冲泡|磨豆)/.test(q)&&!/(衣|渍|洒|沾)/.test(q)&&n.category==='洗衣护理')return 0;
 // A related link should not turn, for example, a pomegranate guide into a coffee result.
 const plain=s=>normalizeSearch(String(s??'').replace(/\[\[[^\]]+\]\]/g,''));
 const title=plain(n.title),tag=plain(n.tag),intro=plain(n.intro),body=plain((n.steps||[]).join(' '));
 const concepts=matchedSearchConcepts(query);
 let score=0;
 for(const c of concepts){const i=c.ids.indexOf(n.id);if(i>=0)score=Math.max(score,160-i*45)}
 if(title.includes(q))score+=100;else if(tag.includes(q))score+=65;else if(intro.includes(q))score+=25;else if(body.includes(q))score+=8;
 const tokens=questionTokens(query);let hits=0;
 for(const t of tokens){if(title.includes(t)){score+=35;hits++}else if(tag.includes(t)){score+=24;hits++}else if(intro.includes(t)){score+=12;hits++}else if(body.includes(t)){score+=4;hits++}}
 if(!score)return 0;
 if(!concepts.some(c=>c.ids.includes(n.id))&&tokens.length>1&&hits<Math.ceil(tokens.length*.6)&&!title.includes(q))return 0;
 return score;
}
function rankedGuides(items,query){if(!normalizeSearch(query))return items;return items.map((note,index)=>({note,index,score:guideSearchScore(note,query)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.index-b.index).map(x=>x.note)}
function priceQuestionMatches(text,query){const q=normalizeSearch(query);if(!q)return true;const hay=normalizeSearch(text);if(hay.includes(q))return true;const compact=q.replace(searchFiller,'');if(compact&&hay.includes(compact))return true;const tokens=questionTokens(query);return tokens.length>1&&tokens.every(t=>hay.includes(t))}
function searchSuggestions(query){return matchedSearchConcepts(query).find(c=>c.suggest)?.suggest||['咖啡渍','芒果切法','水垢','抽屉收纳']}
