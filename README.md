# ProductSaleProject

#Business need: 
      To analyse sale data and provide better visibilty for sales and Marketing teams

##Problem statment:
      Sales do not have real time visibility into daily/current sales performance reports
      Current architecture is not scalable and latest report they receive is a month old. 
      Sales management cannot measure/analyze their performance against the goal plan
      Sales receives a basic summary report of combines sales(direct and trace sales) in summary. 
      Sales analytics team analyze the summary data and share the reports with sales via email. 
      This process limits the sales to run any analytics in excel files. 
      Sales team would like to have an ability to gauge how they are performing against goal plan and analyze deeper with current sales data

#Solution:
      Providing real time dashboard for sale reports and availbilty of sales data for any user to analyse data/customise reports

#Technologies used:
MYSQL
Python
D3.js
Pivotable.js
flask


#Details for reports and Visualizations: 
————————
Reports
1. Category wise Sales report  
   1. Sales  Table - Product Table
       1. Daily
       2. Weekly
       3. Monthly
       4. Quarterly
2. Total Sales  
   1. By zip code
   2. By state
   3. By distributor
   4. By Product
   5. By State by zip code
3. Distributor wise sales 
   1. By state
   2. By product
   3. By revenue
4. Report : 
   1. Q : what is the best selling product  ? Top selling item products
   2. Q : what is the least selling product ? Bottom 5 selling products
   3. Q : what is the best selling region  ?Top selling items by state/zip code
   4. Q : what is the least selling region  ? Botton 5 selling by state/zip code

Visualizations :
1. Map that displays the distribution of distributors
2. Ring chart : Top product in sales
3. Line chart for Category wise Sales report  
4. Bar chart for Category by Sale
5. Meter chart : Total  sales by Quarter
6. Sales opportunity data : display product with sales falling between 60 -80 %




