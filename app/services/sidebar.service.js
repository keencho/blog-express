import postSchema from '../models/post.schema';

export default {
    /*
    * getData
    * 사이드바에 들어갈 데이터들 집합 */
    getData: async() => {

        const tag = await postSchema.aggregate()
            // tag가 배열형식이기 때문에 unwind로 1차 unwrapping
            .unwind('tag')
            // group by는 object 형식으로 하는게 편할듯 하다..
            .group({
                _id: '$tag',
                count: { $sum: 1}
            })
            // group된 object 객체 내부의 변수명으로 끌어와야 하는것 같다. - 붙이면 desc
            .sort('-count')

        const archive = await postSchema.aggregate()
            .group({
                _id: {
                    $substr: ['$created', 0, 7]
                }
            })
            .sort('-_id')
            .limit(10)

        const result = {
            tag: tag,
            archive: archive
        }

        return result;
    }
}
