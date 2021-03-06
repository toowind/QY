Use QPPlatformManagerDB
GO


IF EXISTS(SELECT * FROM dbo.SYSOBJECTS WHERE OBJECT_ID('f_GetAgentWaste')=id AND xtype='FN')
	DROP FUNCTION f_GetFormatDate_CN
GO
CREATE FUNCTION f_GetFormatDate_CN(
	@date VARCHAR(100)
)
RETURNS VARCHAR(100)
AS
BEGIN
	DECLARE @outputdate VARCHAR(100)
	SET @outputdate= CONVERT(VARCHAR(10),YEAR(@date))+'年'+CONVERT(VARCHAR(10),MONTH(@date))+'月'+CONVERT(VARCHAR(10),DAY(@date))+'日'
	RETURN @outputdate
END

GO



IF EXISTS(SELECT * FROM dbo.SysObjects WHERE OBJECT_ID('p_GetChildrenSpreadSum_ByUserID2')=id AND type='P')
	DROP PROC p_GetChildrenSpreadSum_ByUserID2
GO
CREATE PROC p_GetChildrenSpreadSum_ByUserID2
	@UserID INT,
	@Day VARCHAR(10) --格式：yyyy-MM-dd,如：2017-03-24
AS
SELECT a.[UserID],dbo.f_GetFormatDate_CN(a.SpreadDate) SpreadDate,ai.GameID SpreadUser,b.SpreadSum,
CASE WHEN EXISTS(SELECT 1 FROM QPAccountsDB.dbo.AccountsInfo c WHERE c.UserID=b.UserID AND c.SpreaderID=@UserID) THEN '直接' ELSE '间接' END  SpreadType
FROM [QPPlatformManagerDB].[dbo].[RecordSpreadSum] a
INNER JOIN [QPPlatformManagerDB].[dbo].[RecordSpreadSumDetail] b ON a.ID=b.RecordSpreadSumID
INNER JOIN QPAccountsDB.dbo.AccountsInfo ai ON b.UserID=ai.UserID
WHERE a.UserID=@UserID AND SpreadDate=@Day
AND a.SpreadSum<>0

GO



IF EXISTS(SELECT * FROM dbo.SysObjects WHERE OBJECT_ID('p_GetChildrenSpreadSum_ByUserID')=id AND type='P')
	DROP PROC p_GetChildrenSpreadSum_ByUserID
GO
CREATE PROC p_GetChildrenSpreadSum_ByUserID
	@UserID INT,
	@Day VARCHAR(10) --格式：yyyy-MM-dd,如：2017-03-24
AS
SELECT a.[UserID],dbo.f_GetFormatDate_CN(a.SpreadDate) SpreadDate,
'您'+CASE WHEN EXISTS(SELECT 1 FROM QPAccountsDB.dbo.AccountsInfo c WHERE c.UserID=b.UserID AND c.SpreaderID=@UserID) THEN '直接' ELSE '间接' END+'发展的玩家['+CONVERT(VARCHAR(50),ai.GameID)+']给您带来返利'+CONVERT(VARCHAR(50),b.SpreadSum)+'金币的收入' Content
FROM [QPPlatformManagerDB].[dbo].[RecordSpreadSum] a
INNER JOIN [QPPlatformManagerDB].[dbo].[RecordSpreadSumDetail] b ON a.ID=b.RecordSpreadSumID
INNER JOIN QPAccountsDB.dbo.AccountsInfo ai ON b.UserID=ai.UserID
WHERE a.UserID=@UserID AND SpreadDate=@Day
AND a.SpreadSum<>0

GO
