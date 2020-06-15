--ESTADOS
INSERT INTO ESTADOS (DESCRIPCION) VALUES ('PENDIENTE');
INSERT INTO ESTADOS (DESCRIPCION) VALUES ('FINALIZADO');
INSERT INTO ESTADOS (DESCRIPCION) VALUES ('CANCELADO');

--MARCAS
INSERT INTO MARCAS (DESCRIPCION) VALUES ('NVIDIA');
INSERT INTO MARCAS (DESCRIPCION) VALUES ('GENIUS');
INSERT INTO MARCAS (DESCRIPCION) VALUES ('INTEL');
INSERT INTO MARCAS (DESCRIPCION) VALUES ('AMD');

--TIPO_PRODUCTO
INSERT INTO TIPO_PRODUCTO (DESCRIPCION) VALUES ('PROCESADOR');
INSERT INTO TIPO_PRODUCTO (DESCRIPCION) VALUES ('MOTHER');
INSERT INTO TIPO_PRODUCTO (DESCRIPCION) VALUES ('MOUSE');
INSERT INTO TIPO_PRODUCTO (DESCRIPCION) VALUES ('TECLADO');

--USUARIOS
INSERT [dbo].[USUARIOS] ([NOMBRE], [APELLIDO], [CORREO], [DNI], [CLAVE], [ADMINISTRADOR], [FECHA_NACIMIENTO], [SEXO]) VALUES (N'santiago', N'castro', N'santucastro@live.com.ar', CAST(33537569 AS Numeric(11, 0)), N'12345', N's', CAST(N'1988-01-16' AS Date), N'm')
INSERT [dbo].[USUARIOS] ([NOMBRE], [APELLIDO], [CORREO], [DNI], [CLAVE], [ADMINISTRADOR], [FECHA_NACIMIENTO], [SEXO]) VALUES (N'maximiliano', N'di flumeri', N'maxidiflumeri@gmail.com', CAST(33689563 AS Numeric(11, 0)), N'12345', N's', CAST(N'1988-04-22' AS Date), N'm')

--DIRECCIONES
INSERT [dbo].[DIRECCIONES] ([ID_USUARIO], [CALLE], [NUMERO], [PISO], [DEPARTAMENTO], [CP], [PROVINCIA], [LOCALIDAD]) VALUES (CAST(1 AS Numeric(18, 0)), N'rafael obligado', CAST(5628 AS Numeric(10, 0)), NULL, NULL, N'1605', N'buenos aires', N'carapachay')
INSERT [dbo].[DIRECCIONES] ([ID_USUARIO], [CALLE], [NUMERO], [PISO], [DEPARTAMENTO], [CP], [PROVINCIA], [LOCALIDAD]) VALUES (CAST(2 AS Numeric(18, 0)), N'mu�iz', CAST(683 AS Numeric(10, 0)), NULL, NULL, N'1234', N'buenos aires', N'almagro')

--TELEFONOS
INSERT [dbo].[TELEFONOS] ([ID_USUARIO], [TELEFONO], [DESCRIPCION]) VALUES (CAST(1 AS Numeric(18, 0)), CAST(1134757651 AS Numeric(13, 0)), N'celular')
INSERT [dbo].[TELEFONOS] ([ID_USUARIO], [TELEFONO], [DESCRIPCION]) VALUES (CAST(2 AS Numeric(18, 0)), CAST(1155775452 AS Numeric(13, 0)), N'celular')

--PRODUCTOS
INSERT [dbo].[PRODUCTOS] ([ID_TIPO], [ID_MARCA], [MODELO], [DESCRIPCION], [STOCK], [PRECIO], [FECHA_INGRESO], [CANT_VISITAS], [FOTO1], [FOTO2], [FOTO3]) VALUES (CAST(1 AS Numeric(18, 0)), CAST(3 AS Numeric(18, 0)), N'I7 7700K', N'Microprocesador Intel i7 7700k', CAST(5 AS Numeric(18, 0)), CAST(50000.00 AS Numeric(18, 2)), CAST(N'2020-06-14' AS Date), CAST(0 AS Numeric(18, 0)), NULL, NULL, NULL)
INSERT [dbo].[PRODUCTOS] ([ID_TIPO], [ID_MARCA], [MODELO], [DESCRIPCION], [STOCK], [PRECIO], [FECHA_INGRESO], [CANT_VISITAS], [FOTO1], [FOTO2], [FOTO3]) VALUES (CAST(1 AS Numeric(18, 0)), CAST(4 AS Numeric(18, 0)), N'Ryzen 3 3200g', N'Ryzen 3 3200g 4.0ghz', CAST(3 AS Numeric(18, 0)), CAST(19000.00 AS Numeric(18, 2)), CAST(N'2020-06-14' AS Date), CAST(0 AS Numeric(18, 0)), NULL, NULL, NULL)
INSERT [dbo].[PRODUCTOS] ([ID_TIPO], [ID_MARCA], [MODELO], [DESCRIPCION], [STOCK], [PRECIO], [FECHA_INGRESO], [CANT_VISITAS], [FOTO1], [FOTO2], [FOTO3]) VALUES (CAST(3 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), N'genius dx120', N'genius dx120', CAST(6 AS Numeric(18, 0)), CAST(400.00 AS Numeric(18, 2)), CAST(N'2020-06-13' AS Date), CAST(0 AS Numeric(18, 0)), NULL, NULL, NULL)

--PEDIDOS_CAB
INSERT [dbo].[PEDIDOS_CAB] ([ID_USUARIO], [ID_DIRECCION], [FECHA], [IMPORTE_TOTAL], [ID_ESTADO]) VALUES (CAST(1 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), CAST(N'2020-06-14' AS Date), CAST(50400.00 AS Numeric(18, 2)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[PEDIDOS_CAB] ([ID_USUARIO], [ID_DIRECCION], [FECHA], [IMPORTE_TOTAL], [ID_ESTADO]) VALUES (CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), CAST(N'2020-06-14' AS Date), CAST(50400.00 AS Numeric(18, 2)), CAST(2 AS Numeric(18, 0)))

--PEDIDOS_DET
INSERT [dbo].[PEDIDOS_DET] ([ID_PEDIDO], [ID_PRODUCTO], [CANTIDAD], [IMPORTE_UNITARIO]) VALUES (CAST(2 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), CAST(50000.00 AS Numeric(18, 2)))
INSERT [dbo].[PEDIDOS_DET] ([ID_PEDIDO], [ID_PRODUCTO], [CANTIDAD], [IMPORTE_UNITARIO]) VALUES (CAST(2 AS Numeric(18, 0)), CAST(3 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), CAST(400.00 AS Numeric(18, 2)))
