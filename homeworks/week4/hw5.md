## 請以自己的話解釋 API 是什麼

API：Application Programming Interface，意思是為達成目的連接的入口。

舉例而言，當我們的目的是得到一瓶飲料，自動販賣機就是一個入口（API)，我們只需要點擊按鈕，無須理會中間發生的任何事情，飲料就會掉下了。

同理，當我們今天的目的是獲得 Udemy 上的免費課程，當今天有個名為「阿貓」的帳號寫了一隻爬蟲，可以將每天的限時免費課程貼在他的個人帳號。此時，「阿貓」這個帳號亦為我們的入口（API）。

於是我們就可以連想到，當我們要訂機票，Skyscanner 就是我們的 API、當我們要訂旅館，Booking、AirBnB 就是我們的 API。


## 請找出三個課程沒教的 HTTP status code 並簡單介紹

1XX：請求已被接受但仍再處理，算是一種臨時回應
101 Switching Protocols：請求已接受，但遇到更好更新的協定於是切換過去新的協定

2XX：成功
200：請求已成功
202 Accpeted：已接受請求，但尚未處理
204 No Content：已接受請求，沒有返回任何內容

3XX：重新導向
4XX：客戶端錯誤
403 Forbidden：伺服器收到請求，但拒絕執行
408 Request Timeout：請求逾時

5XX：伺服器錯誤
505：伺服器不支援

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。


| 說明     | Method | path       | 參數                   | 範例             |
|--------|--------|------------|----------------------|----------------|
| 回傳所有餐廳資料 | GET    | /restaurants     | _limit:限制回傳資料數量           | /restaurants?_limit=5 |
| 回傳單一餐廳資料 | GET    | /restaurants/:id | 無                    | /restaurants/10      |
| 新增餐廳   | POST   | /restaurants     | name: 店名 | 無              |
| 刪除餐廳   | DELETE   | /restaurants/:id     | 無 | 無              |
| 更改餐廳資訊   | PATCH   | /restaurants/:id     | name: 店名 | 無              |
