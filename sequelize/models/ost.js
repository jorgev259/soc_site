import { DataTypes } from 'sequelize'
import { PLACEHOLDER } from '@/components/utils'

const model = sequelize =>
  sequelize.define('ost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    subTitle: DataTypes.TEXT,
    releaseDate: DataTypes.DATEONLY,
    label: DataTypes.STRING,
    vgmdb: DataTypes.STRING,
    description: DataTypes.STRING,
    status: { type: DataTypes.STRING, defaultValue: 'show' },
    placeholder: { type: DataTypes.TEXT, defaultValue: PLACEHOLDER },
    headerColor: { type: DataTypes.STRING, defaultValue: '#ffffff' }
  },
  {
    freezeTableName: true
  })

export default model
