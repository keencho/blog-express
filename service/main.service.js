import postSchema from '../models/post.schema';

export default {
    /*
    * LIST MAIN
    * 메인페이지에 들어갈 데이터들 집합*/
    listMain: () => {

        const tag = postSchema.aggregate()
            .group({
                _id: '$tag',
                count: { $sum: 1}
            })
            .sort({
                _id: 1
            })

        const archive = postSchema.aggregate()
            .group({
                _id: {
                    $substr: ['$created', 0, 7]
                }
            })
            .sort({
                _id: -1
            })
            .limit(10)

        const result = {
            tag: tag,
            archive: archive
        }

        return result;
    }
}
