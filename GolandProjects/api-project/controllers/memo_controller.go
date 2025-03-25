package controllers

import (
	"api-project/models"
	"api-project/service"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type MemoController struct {
	Service *service.MemoService
}

func NewMemoController(service *service.MemoService) *MemoController {
	return &MemoController{Service: service}
}

func (c *MemoController) GetList(ctx *gin.Context) {
	userIdStr := ctx.Query("userId")
	if userIdStr == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "userIdが必要です"})
		return
	}

	userId, err := strconv.Atoi(userIdStr)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "userIdが正しくありません"})
		return
	}

	memos, err := c.Service.GetListByUserID(uint(userId))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "メモの取得に失敗しました"})
		return
	}

	ctx.JSON(http.StatusOK, memos)
}

func (c *MemoController) GetByID(ctx *gin.Context) {
	idParam := ctx.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "IDが正しくありません"})
		return
	}

	memo, err := c.Service.GetByID(uint(id))
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "メモが見つかりません"})
		return
	}

	ctx.JSON(http.StatusOK, memo)
}

func (c *MemoController) Create(ctx *gin.Context) {
	var memo models.Memo
	if err := ctx.ShouldBindJSON(&memo); err != nil {
		ctx.JSON(400, gin.H{"error": err.Error()})
		return
	}

	if err := c.Service.Create(&memo); err != nil {
		ctx.JSON(500, gin.H{"error": "メモの作成に失敗しました"})
		return
	}
	ctx.JSON(200, memo)
}

func (c *MemoController) Update(ctx *gin.Context) {
	idParam := ctx.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		ctx.JSON(400, gin.H{"error": "IDが正しくありません"})
		return
	}

	var memo models.Memo
	if err := ctx.ShouldBindJSON(&memo); err != nil {
		ctx.JSON(400, gin.H{"error": err.Error()})
		return
	}

	if err := c.Service.Update(uint(id), &memo); err != nil {
		ctx.JSON(500, gin.H{"error": "メモの更新に失敗しました"})
		return
	}

	ctx.JSON(200, gin.H{"message": "更新に成功しました"})
}

func (c *MemoController) Delete(ctx *gin.Context) {
	idParam := ctx.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		ctx.JSON(400, gin.H{"error": "IDが正しくありません"})
		return
	}

	if err := c.Service.Delete(uint(id)); err != nil {
		ctx.JSON(500, gin.H{"error": "削除に失敗しました"})
		return
	}

	ctx.JSON(200, gin.H{"message": "削除に成功しました"})
}
