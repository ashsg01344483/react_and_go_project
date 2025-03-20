package controllers

import (
	"api-project/models"
	"api-project/repository"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

// GetList 全ユーザーを取得
func GetList(c *gin.Context) {
	fmt.Println("🔍 GetList: リクエストを受け取りました")

	users, err := repository.GetList()

	// エラーチェック & ログ出力
	if err != nil {
		fmt.Println("❌ GetList エラー:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get users", "details": err.Error()})
		return
	}

	fmt.Println("✅ GetList 成功:", users)
	c.JSON(http.StatusOK, users)
}

// Create 新しいユーザーを作成
func Create(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		fmt.Println("JSONバインドエラー:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ログ出力: 受け取ったデータを確認
	fmt.Printf("受信データ: %+v\n", user)

	if err := repository.Create(&user); err != nil {
		fmt.Println("データベース登録エラー:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusOK, user)
}

// Update ユーザーを編集
func Update(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "IDが不正です"})
		return
	}

	user, err := repository.FindById(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ユーザーが見つかりません"})
		return
	}

	var input struct {
		Name  string `json:"Name"`
		Email string `json:"Email"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "リクエストの形式が不正です"})
		return
	}

	// ユーザー情報を更新
	user.Name = input.Name
	user.Email = input.Email
	if err := repository.Update(user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "更新に失敗しました"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ユーザーが更新されました", "user": user})
}

// Delete ユーザーを削除
func Delete(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "IDが不正です"})
		return
	}

	_, err = repository.FindById(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ユーザーが見つかりません"})
		return
	}

	if err := repository.Delete(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "削除に失敗しました"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ユーザーが削除されました"})
}
