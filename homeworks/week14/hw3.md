## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
DNS　(Domain Name System)，也就是網域名稱系統，它將人們可讀取的網域名稱 (例如，www.amazon.com) 轉換為機器可讀取的 IP 地址 (例如，192.0.2.44)。

而通常 DNS 的類型為 遞迴 DNS。用戶端通常不會直接向授權 DNS 服務發出查詢，而是連接到另一種類型的 DNS 服務，稱為解析程式，或遞迴 DNS 服務。遞迴 DNS 服務的作用就像飯店門房，雖然並未擁有任何 DNS 記錄，但扮演可代您取得 DNS 資訊的媒介角色。如果遞迴 DNS 已快取 DNS 參考，或已經存放一段時間，它會透過提供來源或 IP 資訊來回應 DNS 查詢。如果並非以上情況，則會將查詢傳遞給一或多個授權 DNS 伺服器以尋找資訊。

而通常我們都是透過 ISP 的服務去解析網址。然而 Google 也有提供公開的 DNS

### 那使用 Google public DNS 的好處是什麼呢？

1. 速度、可靠性以及性能
Google 本身就會定期使用爬蟲抓取各網頁的資料。於是當我們在搜尋 www.example.com 時，提供答案的方式就不一定是遞迴 DNS 的方式，反而是透過快取（Cache）回傳位置，就可以大大減少回答 www.example.com 對應 IP 位置的時間，而更快的查詢時間意味著頁面加載速度更快，停機時間更少。我們一般 ISP 的服務器相對下較不穩定，進而導致網站加載失敗或加載速度非常慢。

2. 安全性
說到快取其時一般 ISP 也有快取，然而快取中毒仍是一種攻擊手段，快取中讀是一種嘗試將用戶從其預期的目標重定向到惡意站點的方法，有的時候網絡罪犯甚至可以控制整個 DNS 區域。 然而 Google Public DNS 提供從 HTTPS 的 DNS 或從 HTTPS 連接上的 DNS 解析，這是可以防止竊聽，篡改或誤導的安全措施。

回頭想想，那為什麼 Google 要提供公開的 DNS？

### Google 提供公開的 DNS 對自己的好處是什麼？

畢竟 Google 仍是一間公司，而公司最大的驅動力來自更高的收益，那提供 DNS 可以從哪個面向帶來效益呢？

1. 數據：顯而易見的，Google 有[八成](https://technews.tw/2020/08/12/top-market-power-5-pictures-to-see-how-american-technology-giants-make-money/)的營收來自廣告收入，透過 DNS 解析 而更精確的受眾分析將有助於 Google 推廣廣告進而帶來收入。

2. 速度：提供更快的上網速度將有助於用戶更頻繁的曝光在廣告底下，進而帶來更多收入

3. 社會公益形象：透過 Google DNS 安全漏洞研究可以提升整個互聯網上的安全。對開源的貢獻極大～


## 什麼是資料庫的 lock？為什麼我們需要 lock？

Lock 簡單而言是資料庫的交易鎖定，因為多筆交易在資料的讀取與寫入的時候，彼此會相互影響，

因此為了交易的 concurrency 與 isolation ，

資料的讀取或是寫入的時候就會被做一個記號，

這個記號用來告知該資料正在被讀取或是寫入的狀態，

其他交易根據這個記號來決定是否要等待到該紀錄狀態結束或是直接讀取該資料

而該「記號」就是所謂的 Locks

然而將全部資料庫的 Lock 起來並非最佳做法，於是我們又可以分層級上鎖
以下為 Lock 的最小單位：

• Row (RID)：這是資料庫鎖定的最小單位，也就是Table 中每一筆的紀錄，
• Key (KEY)：主要發生在 Clustered Index 的資料上
• Page (PAG)：相當於 Row + Key locks 取決於系統資源的狀況而定
• Extent (EXT)：8 Pages = 1 Extent
• Heap or B-tree (HoBT)：會對於整個資料表 and 索引進行 Locks
• Table (TAB)
• File (FIL)
• Application (APP)
• MetaData (MDT)
• Allocation Unit (AU)
• Database (DB)

實作 Lock
```
$conn->autocommit(FALSE);
$conn->begin_transaction();
$conn->query("UPDATE from money set amount = 20 for update");
$conn->commit();
```

## NoSQL 跟 SQL 的差別在哪裡？

SQL (Structured Query Language 結構化查詢語言) 是一種專門用來管理與查詢關聯式資料庫(Relational database)的程式語言
NoSQL資料庫的意思是 "Not Only SQL"，也就是不限定為「關聯式資料庫」的資料庫管理系統的統稱。

### 關聯式資料庫有三個特質：
1）資料是以一個或是多個資料表 (table) 的方式存放。
2）資料之間有明確的關聯。
3）關聯式資料庫以 SQL 語言操作

### NoSQL 資料庫工作邏輯
資料庫（database）：shop
集合（collection）：user、ID
文件 (document) ：{Name:"nax",age:30}

### SQL / NoSQL 五大差異
1.  資料有綱要（schema）/資料不一定有綱要
2.  資料間有關聯 / 資料間不一定有關連
3.  資料在 table 裡面 / 資料可能被包在很多 collection 裡面
4.  無法橫向拓展 / 可以縱向；橫向拓展

## 資料庫的 ACID 是什麼？

資料庫裡面很重要的概念是 Transaction
假設轉帳， A 給 B 20 塊，要保證 A 少 20 的同時 B 要同時多 20 

為了保持 Transaction 的正確性須符合 ACID 原則

Atomicity (原子性) : 資料操作不能只有部分完成。一次的 transaction 只能有兩種結果：成功或失敗
Consistency (一致性)：transaction 完成前後，資料都必須永遠符合 schema 的規範，保持資料（錢的總數相同）與資料庫的一致性
Isolation (隔離性)：資料庫允許多個 transactions 同時對其資料進行操作，但也同時確保這些 transaction 的交叉執行，不會導致數據的不一致
Durability (耐久性)：transaction 完成後，對資料的操作就是永久的，即便系統故障也不會丟失

實作 Transaction
```
$conn->autocommit(FALSE);
$conn->begin_transaction();
$conn->query("UPDATE from money set amount = 20");
$conn->query("UPDATE from money set sum = 10");
$conn->commit();
```