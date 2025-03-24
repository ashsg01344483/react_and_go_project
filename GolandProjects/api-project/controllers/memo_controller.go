package controllers

import (
	"api-project/models"
	"api-project/service"
	"github.com/gin-gonic/gin"
	"strconv"
)

type MemoController struct {
	Service *service.MemoService
}

func NewMemoController(service *service.MemoService) *MemoController {
	return &MemoController{Service: service}
}

func (c *MemoController) GetList(ctx *gin.Context) {
	memos, err := c.Service.GetList()
	if err != nil {
		ctx.JSON(500, gin.H{"error": "メモの取得に失敗しました"})
		return
	}
	ctx.JSON(200, memos)
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
