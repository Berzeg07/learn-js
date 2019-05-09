// npm install postcss-loader autoprefixer css-mqpacker cssnano --save-dev

module.exports = {
    plugins: [
        // Вендорные префиксы
        require('autoprefixer'),
        // Группировка медиа запросов
        require('css-mqpacker'),
        // Минификация
        require('cssnano')({
            preset: [
                'default', {
                    // Чистка комментариев
                    discardComments: {
                        removeAll: true,
                    }
                }
            ]
        })
    ]
}
