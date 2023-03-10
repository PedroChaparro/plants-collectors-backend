# Plants collectors (Backend)

Movile development course first exam project.

## Setup

Follow the instructions below to setup the project.

1. Start docker-compose

```bash
docker-compose up
```

2. Create database tables and views: For this, go to `http://localhost:5050` an login with the following credentials:

- Email: `admin@admin.com`
- Password: `admin`

Then, connect to the plants_collector database with the following credentials:

- Host: `postgres`
- Port: `5432`
- User: `postgres`
- Password: `postgres`

Finally, open the SQL editor and run the `tables.sql` and `views.sql` files (You can find them in the `database` folder).

3. Crete a `.env` file from the `.env.example` file.

4. Run the database setup script.

```bash
pnpm setup:database
```

5. Install the dependencies.

```bash
pnpm i
```

6. Run the project.

```bash
pnpm dev
```

## 📜 Licence

This project is licensed under the AGPL-3.0 License - see the [LICENSE](LICENSE) file for details.

## 🖼️ Images attributions

This project uses images from [Pexels](https://www.pexels.com/es-es/buscar/sunflower/) under the [Pexels License](https://www.pexels.com/es-ES/license/). You can find the original images on:

- [Sunflower](https://www.pexels.com/es-es/foto/fotografia-de-girasol-1157970/)
- [Pink Roses](https://www.pexels.com/es-es/foto/flores-ramo-de-flores-rosas-adentro-10064219/)
- [Indoor cactus](https://www.pexels.com/es-es/foto/planta-en-maceta-de-cactus-verde-en-maceta-de-ceramica-blanca-97260/)
- [Red Orchids](https://www.pexels.com/es-es/foto/rojo-flores-planta-blanco-10046550/)
- [Red Tulips](https://www.pexels.com/es-es/foto/foto-de-tulipanes-naranjas-842847/)
- [White Gardenia](https://www.pexels.com/photo/close-up-photo-of-white-flower-6407078/)
- [Indoor Lavender](https://www.pexels.com/photo/purple-petaled-flowers-2746155/)
- [Red Dahlia](https://www.pexels.com/photo/red-dahlia-flower-60597/)
- [Indoor Marigold](https://www.pexels.com/photo/white-ceramic-vase-with-orange-flowers-2849599/)
- [Indoor Daffodils](https://www.pexels.com/photo/daffodil-bouquet-in-vase-15496076/)
- [Pink Carnation](https://www.pexels.com/photo/pink-petaled-flower-3014453/)
- [Purple Iris](https://www.pexels.com/photo/selective-focus-photography-purple-petaled-flower-on-field-2471455/)
- [Indoor Purple Lilac](https://www.pexels.com/photo/selective-focus-photography-of-purple-hyacinth-flower-1018142/),
- [White Snapdragon](https://www.pexels.com/photo/one-white-snapdragon-flower-7301726/)
- [Dandelion](https://www.pexels.com/photo/close-up-photo-dandelion-against-pink-background-2317874/)
